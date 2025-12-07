import requests
import csv
from datetime import datetime
import pandas as pd

# -----------------------------------------------------------
# TIMESTAMP
# -----------------------------------------------------------
def now_ts():
    return datetime.utcnow().isoformat()


# -----------------------------------------------------------
# WEATHER API (works everywhere)
# -----------------------------------------------------------
def get_weather(lat, lon):
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "hourly": "rain,precipitation,precipitation_probability",
        "forecast_days": 2,
        "timezone": "UTC"
    }
    r = requests.get(url, params=params)
    r.raise_for_status()
    return now_ts(), r.json()


# -----------------------------------------------------------
# FLOOD API (correct endpoint + correct client)
# -----------------------------------------------------------
def get_discharge(lat, lon):
    import openmeteo_requests
    import requests_cache
    from retry_requests import retry

    cache_session = requests_cache.CachedSession(".cache", expire_after=3600)
    retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
    om = openmeteo_requests.Client(session=retry_session)

    url = "https://flood-api.open-meteo.com/v1/flood"  # ✔ CORRECT
    params = {
        "latitude": lat,
        "longitude": lon,
        "daily": ["river_discharge"],
        "models": "seamless_v4",
        "past_days": 92,
        "forecast_days": 183,
    }

    timestamp = now_ts()

    try:
        responses = om.weather_api(url, params=params)
        response = responses[0]

        daily = response.Daily()
        times = pd.date_range(
            start=pd.to_datetime(daily.Time(), unit="s", utc=True),
            end=pd.to_datetime(daily.TimeEnd(), unit="s", utc=True),
            freq=pd.Timedelta(seconds=daily.Interval()),
            inclusive="left"
        )

        discharge_vals = daily.Variables(0).ValuesAsNumpy()

        return timestamp, {
            "time": list(times.astype(str)),
            "river_discharge": discharge_vals.tolist()
        }

    except Exception as e:
        print(f"⚠️ No discharge data for {lat},{lon} → {e}")
        return timestamp, None


# -----------------------------------------------------------
# ELEVATION API
# -----------------------------------------------------------
def get_elevation(lat, lon):
    url = "https://api.open-meteo.com/v1/elevation"
    params = {"latitude": lat, "longitude": lon}
    r = requests.get(url, params=params)
    r.raise_for_status()
    return now_ts(), r.json()


# -----------------------------------------------------------
# RISK MODEL
# -----------------------------------------------------------
def compute_risk(weather, discharge, elevation):
    rain1 = weather["hourly"]["rain"][-1]
    rain3 = sum(weather["hourly"]["rain"][-3:])

    flash = 0
    if rain1 > 20: flash += 2
    if rain3 > 50: flash += 3

    river = 0
    if discharge:
        d = discharge["river_discharge"]
        if len(d) > 1 and d[-1] > 2000:
            river += 2

    elev = elevation["elevation"][0]
    if elev > 500:
        flash += 1

    total = flash + river

    if total >= 5: return "SEVERE"
    if total >= 3: return "WARNING"
    return "SAFE"


# -----------------------------------------------------------
# VILLAGE PROCESSOR
# -----------------------------------------------------------
def process_villages(villages):
    results = []

    for v in villages:
        print(f"\n🔍 Fetching data for {v['name']}...")

        w_ts, weather = get_weather(v["lat"], v["lon"])
        d_ts, discharge = get_discharge(v["lat"], v["lon"])
        e_ts, elevation = get_elevation(v["lat"], v["lon"])

        if discharge:
            discharge_now = discharge["river_discharge"][-1]
        else:
            discharge_now = None

        risk = compute_risk(weather, discharge, elevation)

        results.append({
            "village": v["name"],
            "latitude": v["lat"],
            "longitude": v["lon"],

            "timestamp_weather": w_ts,
            "timestamp_discharge": d_ts,
            "timestamp_elevation": e_ts,

            "weather": {
                "rain_last_hour": weather["hourly"]["rain"][-1],
                "rain_last_3h": sum(weather["hourly"]["rain"][-3:])
            },

            "river": discharge,
            "discharge_now": discharge_now,

            "elevation_meters": elevation["elevation"][0],
            "risk_level": risk
        })

    return results


# -----------------------------------------------------------
# CSV EXPORT
# -----------------------------------------------------------
def write_csv(results, filename="village_flood_data.csv"):
    with open(filename, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            "village", "lat", "lon", "timestamp",
            "rain_last_hour", "rain_last_3h",
            "discharge_now", "elevation", "risk_level"
        ])

        for r in results:
            writer.writerow([
                r["village"],
                r["latitude"],
                r["longitude"],
                r["timestamp_weather"],
                r["weather"]["rain_last_hour"],
                r["weather"]["rain_last_3h"],
                r["discharge_now"],
                r["elevation_meters"],
                r["risk_level"],
            ])


# -----------------------------------------------------------
# MAIN
# -----------------------------------------------------------
if __name__ == "__main__":
    villages = [
        {"name": "Abbottabad", "lat": 34.15, "lon": 73.22},
        {"name": "Sukkur", "lat": 27.70, "lon": 68.86},
        {"name": "Sargodha", "lat": 32.08, "lon": 72.68},
    ]

    data = process_villages(villages)

    write_csv(data)

    print("\n✅ DONE — CSV created and data collected successfully.")

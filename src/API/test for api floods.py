import pandas as pd
import requests_cache
import openmeteo_requests
from retry_requests import retry


# ----------------------------------------------------------
# Setup Open-Meteo client
# ----------------------------------------------------------
cache = requests_cache.CachedSession(".cache", expire_after=3600)
retry_session = retry(cache, retries=5, backoff_factor=0.2)
openmeteo = openmeteo_requests.Client(session=retry_session)


# ----------------------------------------------------------
# 1. Get DAILY discharge from Flood API
# ----------------------------------------------------------
def get_discharge_df(lat, lon, days=120):
    url = "https://flood-api.open-meteo.com/v1/flood"
    params = {
        "latitude": lat,
        "longitude": lon,
        "daily": ["river_discharge"],
        "models": "seamless_v4",
        "past_days": days,
        "forecast_days": 0
    }

    responses = openmeteo.weather_api(url, params)
    response = responses[0]

    daily = response.Daily()

    time_index = pd.date_range(
        start=pd.to_datetime(daily.Time(), unit="s", utc=True),
        end=pd.to_datetime(daily.TimeEnd(), unit="s", utc=True),
        freq=pd.Timedelta(seconds=daily.Interval()),
        inclusive="left",
    )

    discharge_vals = daily.Variables(0).ValuesAsNumpy()

    df = pd.DataFrame({
        "date": time_index.date,
        "discharge_m3s": discharge_vals
    })

    return df


# ----------------------------------------------------------
# 2. Get HOURLY rainfall, then convert to DAILY totals
# ----------------------------------------------------------
def get_rainfall_df(lat, lon):
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "hourly": ["precipitation", "rain"],
        "past_days": 93,         # ✔ API MAXIMUM
        "forecast_days": 0,
        "timezone": "UTC"
    }

    responses = openmeteo.weather_api(url, params)
    response = responses[0]

    hourly = response.Hourly()

    timestamps = pd.date_range(
        start=pd.to_datetime(hourly.Time(), unit="s", utc=True),
        end=pd.to_datetime(hourly.TimeEnd(), unit="s", utc=True),
        freq=pd.Timedelta(seconds=hourly.Interval()),
        inclusive="left"
    )

    hourly_precip = hourly.Variables(0).ValuesAsNumpy()
    hourly_rain = hourly.Variables(1).ValuesAsNumpy()

    df = pd.DataFrame({
        "datetime": timestamps,
        "precipitation_mm": hourly_precip,
        "rain_mm": hourly_rain
    })

    df["date"] = df["datetime"].dt.date
    daily = df.groupby("date")[["precipitation_mm", "rain_mm"]].sum().reset_index()

    return daily


# ----------------------------------------------------------
# 3. Merge rainfall & discharge
# ----------------------------------------------------------
def build_city_csv(name, lat, lon):
    print(f"\n🔍 Fetching data for {name}...")

    # Get discharge (120+ days)
    try:
        discharge_df = get_discharge_df(lat, lon, 120)
    except Exception as e:
        print(f"⚠️ No discharge data for {name}: {e}")
        discharge_df = pd.DataFrame(columns=["date", "discharge_m3s"])

    # Get rainfall (93 days max)
    try:
        rainfall_df = get_rainfall_df(lat, lon)
    except Exception as e:
        print(f"⚠️ No rainfall data for {name}: {e}")
        rainfall_df = pd.DataFrame(columns=["date", "precipitation_mm", "rain_mm"])

    # Merge by date
    merged = pd.merge(rainfall_df, discharge_df, on="date", how="outer").sort_values("date")

    # Save CSV
    filename = f"{name.replace(' ', '_')}_rain_discharge.csv"
    merged.to_csv(filename, index=False)

    print(f"✅ Saved {filename} ({len(merged)} days)")


# ----------------------------------------------------------
# Run
# ----------------------------------------------------------
if __name__ == "__main__":
    cities = [
        {"name": "Abbottabad", "lat": 34.15, "lon": 73.22},
        {"name": "Sukkur", "lat": 27.70, "lon": 68.86},
        {"name": "Sargodha", "lat": 32.08, "lon": 72.68},
        {"name": "Khairpur", "lat": 27.72, "lon": 68.84},
    ]

    for c in cities:
        build_city_csv(c["name"], c["lat"], c["lon"])

    print("\n🎉 ALL CITY CSV FILES GENERATED SUCCESSFULLY!")

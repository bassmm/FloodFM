import pandas as pd
import requests
from datetime import datetime, timedelta
import numpy as np

# Encode cities exactly like your training dataset
CITY_ENCODINGS = {
    "Jacobabad": 0,
    "Dadu": 1,
    "Kashmore": 2,
    "Larkana": 3,
    "Rajanpur": 4,
    "Dera Ghazi Khan": 5,
    "Sargodha": 6,
    "Khanewal": 7,
    "Bahawalpur": 8,
    "Sukkur": 9,
    "Mehar": 10,
    "Jhang": 11,
    "Multan": 12,
    "Ghotki": 13,
    "Sanghar": 14,
    "Naushahro Feroze": 15,
    "Mithi": 16,
    "Mingora": 17
}


# Coordinates for API calls
CITY_COORDS = {
    "Jacobabad": (28.2831, 68.4416),
    "Dadu": (27.7808, 67.7771),
    "Kashmore": (27.6206, 68.0372),
    "Larkana": (27.5614, 68.2048),
    "Rajanpur": (28.4286, 70.3122),
    "Dera Ghazi Khan": (29.9607, 70.6308),
    "Sargodha": (32.0856, 72.6377),
    "Khanewal": (30.1920, 71.9435),
    "Bahawalpur": (29.3956, 71.6858),
    "Sukkur": (27.7065, 68.8739),
    "Mehar": (27.6000, 67.6500),
    "Jhang": (31.2743, 72.3147),
    "Multan": (30.1575, 71.4454),
    "Ghotki": (27.8253, 68.7619),
    "Sanghar": (27.0906, 68.9552),
    "Naushahro Feroze": (27.2523, 68.4122),
    "Mithi": (24.7421, 70.1879),
    "Mingora": (34.7679, 72.4464)
}



def fetch_openmeteo_timeseries(lat, lon, past_days=7):
    """Fetch 7 days of hourly rainfall & precipitation and daily discharge."""
    
    # Rainfall request
    url_rain = "https://api.open-meteo.com/v1/forecast"
    params_rain = {
        "latitude": lat,
        "longitude": lon,
        "hourly": ["precipitation", "rain"],
        "past_days": past_days,
        "forecast_days": 0,
        "timezone": "UTC"
    }
    rain_data = requests.get(url_rain, params=params_rain).json()

    # Discharge request
    url_discharge = "https://flood-api.open-meteo.com/v1/flood"
    params_discharge = {
        "latitude": lat,
        "longitude": lon,
        "daily": ["river_discharge"],
        "models": "seamless_v4",
        "past_days": past_days,
        "forecast_days": 0,
        "timezone": "UTC"
    }
    discharge_data = requests.get(url_discharge, params=params_discharge).json()

    return rain_data, discharge_data


def build_feature_row(city):
    """Build a complete feature row for today's prediction."""

    lat, lon = CITY_COORDS[city]

    rain_json, discharge_json = fetch_openmeteo_timeseries(lat, lon)

    # Extract hourly rain & precipitation
    rain_values = rain_json["hourly"]["rain"]
    precip_values = rain_json["hourly"]["precipitation"]

    # Extract daily discharge
    discharge_values = discharge_json["daily"]["river_discharge"]

    # Compute daily rain from hourly
    today_rain = np.sum(rain_values[-24:])
    today_precip = np.sum(precip_values[-24:])

    # Lag features using previous days
    rain_lag1 = np.sum(rain_values[-48:-24])
    rain_lag3 = np.sum(rain_values[-96:-72])
    discharge_lag1 = discharge_values[-2]
    discharge_lag3 = discharge_values[-4]

    # Rolling averages
    rain_3day_avg = (rain_lag1 + rain_lag3 + today_rain) / 3
    discharge_7day_avg = np.mean(discharge_values[-7:])

    # Date features
    now = datetime.utcnow()
    month = now.month
    day_of_year = now.timetuple().tm_yday
    is_monsoon = 1 if month in [6, 7, 8, 9] else 0

    # Final feature row
    row = {
        "precipitation_mm": today_precip,
        "rain_mm": today_rain,
        "discharge_m3s": discharge_values[-1],
        "rain_lag1": rain_lag1,
        "rain_lag3": rain_lag3,
        "discharge_lag1": discharge_lag1,
        "discharge_lag3": discharge_lag3,
        "rain_3day_avg": rain_3day_avg,
        "discharge_7day_avg": discharge_7day_avg,
        "month": month,
        "day_of_year": day_of_year,
        "is_monsoon": is_monsoon,
        "city_encoded": CITY_ENCODINGS[city]
    }

    return row

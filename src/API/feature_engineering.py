import pandas as pd

def add_features(df):
    # Convert date to datetime
    df["date"] = pd.to_datetime(df["date"])

    # Sort by city/date
    df = df.sort_values(["city", "date"])

    # LAG FEATURES
    df["rain_lag1"] = df.groupby("city")["rain_mm"].shift(1)
    df["rain_lag3"] = df.groupby("city")["rain_mm"].shift(3)
    df["discharge_lag1"] = df.groupby("city")["discharge_m3s"].shift(1)
    df["discharge_lag3"] = df.groupby("city")["discharge_m3s"].shift(3)

    # ROLLING AVERAGES
    df["rain_3day_avg"] = df.groupby("city")["rain_mm"].rolling(3).mean().reset_index(0, drop=True)
    df["discharge_7day_avg"] = df.groupby("city")["discharge_m3s"].rolling(7).mean().reset_index(0, drop=True)

    # DATE FEATURES
    df["month"] = df["date"].dt.month
    df["day_of_year"] = df["date"].dt.dayofyear
    df["is_monsoon"] = df["month"].isin([6,7,8,9]).astype(int)

    # CITY ENCODING
    df["city_encoded"] = df["city"].astype("category").cat.codes

    return df


if __name__ == "__main__":
    df = pd.read_csv("full_flood_dataset_labeled.csv")
    df_fe = add_features(df)

    df_fe.to_csv("full_flood_dataset_features.csv", index=False)

    print("✅ Feature engineering completed → full_flood_dataset_features.csv")
    print(df_fe.head(10))

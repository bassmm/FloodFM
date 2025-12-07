import pandas as pd

def assign_label(row):
    rain = row["rain_mm"]
    discharge = row["discharge_m3s"]

    # RED – severe flood risk
    if discharge > 2000 or rain > 80:
        return "RED"

    # ORANGE – warning
    if discharge > 500 or rain > 30:
        return "ORANGE"

    # GREEN – safe
    return "GREEN"


if __name__ == "__main__":
    df = pd.read_csv("full_flood_dataset.csv")

    df["risk_label"] = df.apply(assign_label, axis=1)

    df.to_csv("full_flood_dataset_labeled.csv", index=False)

    print("✅ Labeled dataset saved → full_flood_dataset_labeled.csv")
    print(df.head())

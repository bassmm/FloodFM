import pandas as pd
import glob

def load_all_city_data():
    files = glob.glob("*_rain_discharge.csv")

    dfs = []
    for file in files:
        city_name = file.replace("_rain_discharge.csv", "")
        df = pd.read_csv(file)

        df["city"] = city_name
        dfs.append(df)

    full_df = pd.concat(dfs).reset_index(drop=True)
    return full_df


if __name__ == "__main__":
    df = load_all_city_data()
    print(df.head())
    print("Total rows:", len(df))

    df.to_csv("full_flood_dataset.csv", index=False)
    print("Saved combined dataset → full_flood_dataset.csv")

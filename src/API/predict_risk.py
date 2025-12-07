import pandas as pd
import joblib
import numpy as np

# Load saved model + label encoder
model = joblib.load("xgboost_flood_model.pkl")
label_encoder = joblib.load("label_encoder.pkl")

# Must match training order exactly
FEATURE_COLUMNS = [
    "precipitation_mm",
    "rain_mm",
    "discharge_m3s",
    "rain_lag1",
    "rain_lag3",
    "discharge_lag1",
    "discharge_lag3",
    "rain_3day_avg",
    "discharge_7day_avg",
    "month",
    "day_of_year",
    "is_monsoon",
    "city_encoded"
]

def predict_risk(feature_row):
    """
    feature_row: dict containing all required feature values
    
    Returns:
    {
        "risk": "GREEN" | "ORANGE" | "RED",
        "confidence": float (0-1)
    }
    """

    # --- VALIDATE FEATURE ROW ---
    missing = [f for f in FEATURE_COLUMNS if f not in feature_row]
    if missing:
        raise ValueError(f"Missing required features: {missing}")

    # Create dataframe with correct column order
    df = pd.DataFrame([[feature_row[f] for f in FEATURE_COLUMNS]], columns=FEATURE_COLUMNS)

    # MODEL PREDICTION
    pred_class = model.predict(df)[0]
    pred_label = label_encoder.inverse_transform([pred_class])[0]

    # CONFIDENCE SCORE
    probs = model.predict_proba(df)[0]
    confidence = float(np.max(probs))

    return {
        "risk": pred_label,
        "confidence": confidence
    }

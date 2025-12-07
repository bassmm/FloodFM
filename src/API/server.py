from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

from build_feature_row import build_feature_row
from predict_risk import predict_risk

app = FastAPI(
    title="Pakistan Flood ML API",
    description="Real-time flood risk predictions using Open-Meteo + XGBoost ML",
    version="1.0"
)

# Allow dashboard / local frontend to call API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow everything for hackathon demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root test endpoint
@app.get("/")
def home():
    return {"message": "Flood Risk API is running!"}


@app.get("/api/flood_risk/{city}")
def flood_risk(city: str):
    city = city.strip()

    try:
        # Build today's feature row
        feature_row = build_feature_row(city)

        # Make prediction
        result = predict_risk(feature_row)

        return {
            "city": city,
            "risk": result["risk"],
            "confidence": result["confidence"],
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }

    except KeyError:
        return {"error": f"City '{city}' not found. Check spelling or mapping."}
    except Exception as e:
        return {"error": str(e)}

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Load feature engineered dataset
df = pd.read_csv("full_flood_dataset_features.csv")

# Drop rows with missing values (lags create some NaNs)
df = df.dropna()

# Select features for ML (all numeric columns except target)
feature_cols = [
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

X = df[feature_cols]

# Encode labels RED/ORANGE/GREEN → numeric
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(df["risk_label"])

# Save encoder classes so dashboard knows mapping
import joblib
joblib.dump(label_encoder, "label_encoder.pkl")

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, shuffle=True, random_state=42
)

print("✔ Dataset split complete")
print("Train size:", len(X_train))
print("Test size:", len(X_test))

from xgboost import XGBClassifier
from sklearn.model_selection import RandomizedSearchCV

# Define model
xgb = XGBClassifier(
    eval_metric="mlogloss",
    objective="multi:softmax",
    num_class=3,
    tree_method="hist",
)

param_grid = {
    "n_estimators": [100, 200, 300, 400],
    "learning_rate": [0.01, 0.05, 0.1],
    "max_depth": [3, 5, 7, 9],
    "subsample": [0.6, 0.8, 1.0],
    "colsample_bytree": [0.6, 0.8, 1.0]
}

search = RandomizedSearchCV(
    xgb,
    param_distributions=param_grid,
    n_iter=20,
    scoring="accuracy",
    cv=3,
    verbose=1,
    n_jobs=-1
)

search.fit(X_train, y_train)

best_model = search.best_estimator_

print("✔ Best parameters:", search.best_params_)

from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

# Predict test set
y_pred = best_model.predict(X_test)

# Evaluation report
print("\nClassification Report:\n")
print(classification_report(y_test, y_pred, target_names=label_encoder.classes_))

# Confusion matrix
cm = confusion_matrix(y_test, y_pred)
sns.heatmap(cm, annot=True, fmt="d", cmap="Blues",
            xticklabels=label_encoder.classes_,
            yticklabels=label_encoder.classes_)
plt.title("Confusion Matrix")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.show()


import numpy as np

importance = best_model.feature_importances_

plt.figure(figsize=(10,6))
plt.barh(feature_cols, importance)
plt.title("Feature Importance")
plt.xlabel("Importance Score")
plt.ylabel("Features")
plt.show()


joblib.dump(best_model, "xgboost_flood_model.pkl")
print("✔ Model saved as xgboost_flood_model.pkl")




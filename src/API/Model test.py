from build_feature_row import build_feature_row
from predict_risk import predict_risk

row = build_feature_row("Abbottabad")
result = predict_risk(row)

print(result)

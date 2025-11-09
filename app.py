from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import os

app = Flask(__name__)
CORS(app)

# Load model and scaler
MODEL_PATH = os.path.join(os.path.dirname(__file__), "calorie_model.pkl")
SCALER_PATH = os.path.join(os.path.dirname(__file__), "scaler.pkl")

with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

with open(SCALER_PATH, "rb") as f:
    scaler = pickle.load(f)

FEATURES = [
    "Age",
    "Gender",
    "Weight (kg)",
    "Height (m)",
    "Avg_BPM",
    "Session_Duration (hours)",
    "Fat_Percentage",
    "Water_Intake (liters)",
    "Workout_Frequency (days/week)",
    "Experience_Level",
    "BMI",
]


def ensure_height_weight_and_bmi(data):
    """Convert input height/weight units and compute BMI."""
    height_m, weight_kg = None, None

    # Height conversions
    if "Height_Feet" in data:
        feet = float(data.get("Height_Feet", 0))
        inches = float(data.get("Height_Inches", 0))
        height_m = (feet * 12 + inches) * 0.0254
        data["Height (m)"] = round(height_m, 3)
    elif "Height_cm" in data:
        height_m = float(data.get("Height_cm", 0)) / 100
        data["Height (m)"] = round(height_m, 3)
    elif "Height (m)" in data:
        height_m = float(data.get("Height (m)", 0))

    # Weight conversions
    if "Weight_Unit" in data and str(data["Weight_Unit"]).lower() in ("lbs", "pounds"):
        weight = float(data.get("Weight", 0))
        weight_kg = weight * 0.453592
        data["Weight (kg)"] = round(weight_kg, 2)
    elif "Weight (kg)" in data:
        weight_kg = float(data["Weight (kg)"])
    elif "Weight" in data:
        weight_kg = float(data["Weight"])
        data["Weight (kg)"] = round(weight_kg, 2)

    # BMI calculation
    if not data.get("BMI") or float(data["BMI"]) == 0:
        if height_m and weight_kg and height_m > 0:
            bmi = weight_kg / (height_m ** 2)
            data["BMI"] = round(bmi, 2)
        else:
            data["BMI"] = 0.0

    return data


@app.route("/", methods=["GET"])
def home():
    return "✅ Smart Gym Flask API running — with auto height, weight, BMI support."


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)
        data = ensure_height_weight_and_bmi(data)

        for feature in FEATURES:
            data.setdefault(feature, 0)

        data["Gender"] = int(data.get("Gender", 0))

        df = pd.DataFrame([data], columns=FEATURES)
        X_scaled = scaler.transform(df)
        per_session = float(model.predict(X_scaled)[0])
        workout_freq = float(data.get("Workout_Frequency (days/week)", 1))
        per_week = per_session * workout_freq
        per_month = per_week * 4

        return jsonify({
            "input": data,
            "per_session": round(per_session, 2),
            "per_week": round(per_week, 2),
            "per_month": round(per_month, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

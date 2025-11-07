# from flask import Flask, request, jsonify, render_template_string
# import pandas as pd
# import pickle

# app = Flask(__name__)

# # ------------------------------
# # Load saved model and scaler
# # ------------------------------
# with open("calorie_model.pkl", "rb") as f:
#     model = pickle.load(f)

# with open("scaler.pkl", "rb") as f:
#     scaler = pickle.load(f)

# # Exact features used during training
# high_corr_features = [
#     'Age', 'Gender', 'Weight (kg)', 'Height (m)', 'Avg_BPM',
#     'Session_Duration (hours)', 'Fat_Percentage', 'Water_Intake (liters)',
#     'Workout_Frequency (days/week)', 'Experience_Level', 'BMI'
# ]

# # ------------------------------
# # Home page with HTML form
# # ------------------------------
# @app.route("/", methods=["GET", "POST"])
# def home():
#     result = None
#     if request.method == "POST":
#         # Create data dictionary from form input
#         data = {feature: float(request.form[feature]) for feature in high_corr_features}
#         data['Gender'] = int(data['Gender'])  # Gender should be int

#         df = pd.DataFrame([data])
#         X_scaled = scaler.transform(df[high_corr_features])
#         per_session = float(model.predict(X_scaled)[0])
#         workout_freq = data["Workout_Frequency (days/week)"]
#         per_week = per_session * workout_freq
#         per_month = per_week * 4

#         result = f"🔥 Per Session: {per_session:.2f} kcal | 📅 Per Week: {per_week:.2f} kcal | 🗓️ Per Month: {per_month:.2f} kcal"

#     # Simple HTML form
#     html = """
#     <h1>Calories Prediction</h1>
#     <form method="POST">
#     {% for feature in features %}
#       {{feature}}: <input name="{{feature}}"><br>
#     {% endfor %}
#     <br><input type="submit" value="Predict Calories">
#     </form>
#     <h2>{{result}}</h2>
#     """
#     return render_template_string(html, result=result, features=high_corr_features)

# # ------------------------------
# # API route for frontend React
# # ------------------------------
# @app.route("/predict", methods=["POST"])
# def predict():
#     data = request.json
#     # Keep only the features model expects
#     filtered_data = {f: data[f] for f in high_corr_features if f in data}
#     filtered_data['Gender'] = int(filtered_data['Gender'])
#     df = pd.DataFrame([filtered_data])

#     X_scaled = scaler.transform(df[high_corr_features])
#     per_session = float(model.predict(X_scaled)[0])
#     workout_freq = filtered_data.get("Workout_Frequency (days/week)", 1)
#     per_week = per_session * workout_freq
#     per_month = per_week * 4

#     return jsonify({
#         "per_session": round(per_session, 2),
#         "per_week": round(per_week, 2),
#         "per_month": round(per_month, 2)
#     })

# # ------------------------------
# # Run Flask app
# # ------------------------------
# if __name__ == "__main__":
#     app.run(debug=True)



# from flask import Flask, request, jsonify, render_template_string
# from flask_cors import CORS
# import pandas as pd
# import pickle

# app = Flask(__name__)
# CORS(app)  # allow React frontend to access

# # ------------------------------
# # Load saved model and scaler
# # ------------------------------
# with open(r"api\calorie_model.pkl", "rb") as f:
#     model = pickle.load(f)

# with open(r"api\scaler.pkl", "rb") as f:
#     scaler = pickle.load(f)

# # Exact features used during training
# high_corr_features = [
#     'Age', 'Gender', 'Weight (kg)', 'Height (m)', 'Avg_BPM',
#     'Session_Duration (hours)', 'Fat_Percentage', 'Water_Intake (liters)',
#     'Workout_Frequency (days/week)', 'Experience_Level', 'BMI'
# ]

# # Mapping from React keys to model keys
# key_map = {
#     "Age": "Age",
#     "Gender": "Gender",
#     "Weight_kg": "Weight (kg)",
#     "Height_m": "Height (m)",
#     "Avg_BPM": "Avg_BPM",
#     "Session_Duration_hours": "Session_Duration (hours)",
#     "Fat_Percentage": "Fat_Percentage",
#     "Water_Intake_liters": "Water_Intake (liters)",
#     "Workout_Frequency_days_week": "Workout_Frequency (days/week)",
#     "Experience_Level": "Experience_Level",
#     "BMI": "BMI"
# }
# @app.route("/", methods=["GET"])
# # def home():
# #     return "✅ ML Flask server is running!"
# # ------------------------------
# # API route for frontend React
# # ------------------------------
# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.json

#         # Map React keys to model keys
#         mapped_data = {key_map[k]: data[k] for k in data if k in key_map}
#         mapped_data['Gender'] = int(mapped_data['Gender'])  # ensure Gender is int

#         df = pd.DataFrame([mapped_data])

#         # Scale features
#         X_scaled = scaler.transform(df[high_corr_features])

#         # Predict calories
#         per_session = float(model.predict(X_scaled)[0])
#         workout_freq = mapped_data.get("Workout_Frequency (days/week)", 1)
#         per_week = per_session * workout_freq
#         per_month = per_week * 4

#         return jsonify({
#             "per_session": round(per_session, 2),
#             "per_week": round(per_week, 2),
#             "per_month": round(per_month, 2)
#         })

#     except Exception as e:
#         print("Error:", e)
#         return jsonify({"error": str(e)}), 400

# # ------------------------------
# # Run Flask app
# # ------------------------------
# if __name__ == "__main__":
#     app.run(debug=True)




from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle

# ===============================
# Initialize Flask
# ===============================
app = Flask(__name__)
CORS(app)

# ===============================
# Load Model and Scaler
# ===============================
with open(r"calorie_model.pkl", "rb") as f:
    model = pickle.load(f)

with open(r"scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

# ===============================
# Features expected from React
# ===============================
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

@app.route("/", methods=["GET"])
def home():
    return "✅ ML Flask server is running!"

# ===============================
# API Route for prediction
# ===============================
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)

        # Check for missing fields
        missing = [f for f in FEATURES if f not in data]
        if missing:
            return jsonify({"error": f"Missing features: {missing}"}), 400

        # Convert to DataFrame
        input_df = pd.DataFrame([data], columns=FEATURES)

        # Convert Gender to int
        input_df["Gender"] = input_df["Gender"].astype(int)

        # Scale features
        X_scaled = scaler.transform(input_df)

        # Predict calories
        per_session = float(model.predict(X_scaled)[0])
        workout_freq = input_df["Workout_Frequency (days/week)"].iloc[0]
        per_week = per_session * workout_freq
        per_month = per_week * 4

        # ✅ Unified response keys (frontend will use these)
        return jsonify({
            "per_session": round(per_session, 2),
            "per_week": round(per_week, 2),
            "per_month": round(per_month, 2)
        })

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 400

# ===============================
# Run Flask server
# ===============================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)





# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import pickle
# import os

# app = Flask(__name__)
# CORS(app)

# # Load model and scaler
# MODEL_PATH = os.path.join(os.path.dirname(__file__), "calorie_model.pkl")
# SCALER_PATH = os.path.join(os.path.dirname(__file__), "scaler.pkl")

# with open(MODEL_PATH, "rb") as f:
#     model = pickle.load(f)

# with open(SCALER_PATH, "rb") as f:
#     scaler = pickle.load(f)

# FEATURES = [
#     "Age",
#     "Gender",
#     "Weight (kg)",
#     "Height (m)",
#     "Avg_BPM",
#     "Session_Duration (hours)",
#     "Fat_Percentage",
#     "Water_Intake (liters)",
#     "Workout_Frequency (days/week)",
#     "Experience_Level",
#     "BMI",
# ]

# @app.route("/", methods=["GET"])
# def home():
#     return "✅ ML Flask serverless function is running!"

# @app.route("/", methods=["POST"])
# def predict():
#     try:
#         data = request.json
#         missing = [f for f in FEATURES if f not in data]
#         if missing:
#             return jsonify({"error": f"Missing features: {missing}"}), 400

#         df = pd.DataFrame([data], columns=FEATURES)
#         df["Gender"] = df["Gender"].astype(int)
#         X_scaled = scaler.transform(df)
#         per_session = float(model.predict(X_scaled)[0])
#         workout_freq = df["Workout_Frequency (days/week)"].iloc[0]
#         per_week = per_session * workout_freq
#         per_month = per_week * 4

#         return jsonify({
#             "per_session": round(per_session, 2),
#             "per_week": round(per_week, 2),
#             "per_month": round(per_month, 2)
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 400



# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import pickle

# app = Flask(__name__)
# CORS(app, origins=["*"])  # allow React frontend to access

# # ------------------------------
# # Load saved model and scaler
# # ------------------------------
# with open("calorie_model.pkl", "rb") as f:
#     model = pickle.load(f)

# with open("scaler.pkl", "rb") as f:
#     scaler = pickle.load(f)

# # Features used by the model
# FEATURES = [
#     "Age",
#     "Gender",
#     "Weight (kg)",
#     "Height (m)",
#     "Avg_BPM",
#     "Session_Duration (hours)",
#     "Fat_Percentage",
#     "Water_Intake (liters)",
#     "Workout_Frequency (days/week)",
#     "Experience_Level",
#     "BMI"
# ]

# # Map React frontend keys to model keys
# KEY_MAP = {
#     "Age": "Age",
#     "Gender": "Gender",
#     "Weight_kg": "Weight (kg)",
#     "Height_m": "Height (m)",
#     "Avg_BPM": "Avg_BPM",
#     "Session_Duration_hours": "Session_Duration (hours)",
#     "Fat_Percentage": "Fat_Percentage",
#     "Water_Intake_liters": "Water_Intake (liters)",
#     "Workout_Frequency_days_week": "Workout_Frequency (days/week)",
#     "Experience_Level": "Experience_Level",
#     "BMI": "BMI"
# }

# # ------------------------------
# # Home endpoint
# # ------------------------------
# @app.route("/", methods=["GET"])
# def home():
#     return jsonify({"message": "✅ ML Flask serverless server is running!"})

# # ------------------------------
# # Prediction endpoint
# # ------------------------------
# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.json
#         # Map frontend keys to model keys
#         mapped_data = {KEY_MAP[k]: data[k] for k in data if k in KEY_MAP}
#         mapped_data['Gender'] = int(mapped_data['Gender'])

#         df = pd.DataFrame([mapped_data], columns=FEATURES)
#         X_scaled = scaler.transform(df)

#         per_session = float(model.predict(X_scaled)[0])
#         workout_freq = mapped_data.get("Workout_Frequency (days/week)", 1)
#         per_week = per_session * workout_freq
#         per_month = per_week * 4

#         return jsonify({
#             "per_session": round(per_session, 2),
#             "per_week": round(per_week, 2),
#             "per_month": round(per_month, 2)
#         })

#     except Exception as e:
#         print("Error:", e)
#         return jsonify({"error": str(e)}), 400

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import pickle

# app = Flask(__name__)
# CORS(app, origins=["*"])  # allow all origins

# # Load model & scaler
# with open(r"api\calorie_model.pkl", "rb") as f:
#     model = pickle.load(f)

# with open(r"api\scaler.pkl", "rb") as f:
#     scaler = pickle.load(f)

# FEATURES = [
#     "Age","Gender","Weight (kg)","Height (m)","Avg_BPM",
#     "Session_Duration (hours)","Fat_Percentage","Water_Intake (liters)",
#     "Workout_Frequency (days/week)","Experience_Level","BMI"
# ]

# KEY_MAP = {
#     "Age": "Age", "Gender": "Gender","Weight_kg": "Weight (kg)","Height_m": "Height (m)",
#     "Avg_BPM": "Avg_BPM","Session_Duration_hours": "Session_Duration (hours)",
#     "Fat_Percentage": "Fat_Percentage","Water_Intake_liters": "Water_Intake (liters)",
#     "Workout_Frequency_days_week": "Workout_Frequency (days/week)",
#     "Experience_Level": "Experience_Level","BMI": "BMI"
# }

# @app.route("/", methods=["GET"])
# def home():
#     return jsonify({"message": "✅ ML Flask serverless server is running!"})

# @app.route("/predict", methods=["POST","OPTIONS"])
# def predict():
#     # Handle preflight request
#     if request.method == "OPTIONS":
#         response = jsonify({"message":"ok"})
#         response.headers.add("Access-Control-Allow-Origin", "*")
#         response.headers.add("Access-Control-Allow-Headers", "*")
#         response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
#         return response

#     try:
#         data = request.json
#         mapped_data = {KEY_MAP[k]: data[k] for k in data if k in KEY_MAP}
#         mapped_data['Gender'] = int(mapped_data['Gender'])

#         df = pd.DataFrame([mapped_data], columns=FEATURES)
#         X_scaled = scaler.transform(df)

#         per_session = float(model.predict(X_scaled)[0])
#         workout_freq = mapped_data.get("Workout_Frequency (days/week)", 1)
#         per_week = per_session * workout_freq
#         per_month = per_week * 4

#         response = jsonify({
#             "per_session": round(per_session, 2),
#             "per_week": round(per_week, 2),
#             "per_month": round(per_month, 2)
#         })
#         response.headers.add("Access-Control-Allow-Origin", "*")
#         return response

#     except Exception as e:
#         print("Error:", e)
#         return jsonify({"error": str(e)}), 400


# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import pickle

# # ===============================
# # Initialize Flask
# # ===============================
# app = Flask(__name__)
# CORS(app)

# # ===============================
# # Load Model and Scaler
# # ===============================
# with open("api/calorie_model.pkl", "rb") as f:
#     model = pickle.load(f)

# with open("api/scaler.pkl", "rb") as f:
#     scaler = pickle.load(f)

# # ===============================
# # Features
# # ===============================
# FEATURES = [
#     "Age",
#     "Gender",
#     "Weight (kg)",
#     "Height (m)",
#     "Avg_BPM",
#     "Session_Duration (hours)",
#     "Fat_Percentage",
#     "Water_Intake (liters)",
#     "Workout_Frequency (days/week)",
#     "Experience_Level",
#     "BMI",
# ]

# @app.route("/", methods=["GET"])
# def home():
#     return "✅ ML Flask server is running on Vercel!"

# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.json
#         missing = [f for f in FEATURES if f not in data]
#         if missing:
#             return jsonify({"error": f"Missing features: {missing}"}), 400

#         input_df = pd.DataFrame([data], columns=FEATURES)
#         input_df["Gender"] = input_df["Gender"].astype(int)

#         X_scaled = scaler.transform(input_df)
#         per_session = float(model.predict(X_scaled)[0])
#         workout_freq = input_df["Workout_Frequency (days/week)"].iloc[0]
#         per_week = per_session * workout_freq
#         per_month = per_week * 4

#         return jsonify({
#             "per_session": round(per_session, 2),
#             "per_week": round(per_week, 2),
#             "per_month": round(per_month, 2)
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 400

# Do NOT include app.run() for Vercel

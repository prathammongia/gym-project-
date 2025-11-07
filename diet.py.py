# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import numpy as np
# from sklearn.preprocessing import StandardScaler
# from sklearn.metrics.pairwise import cosine_similarity
# import random
# import pickle

# # ===============================
# # 1. Initialize Flask
# # ===============================
# app = Flask(__name__)
# CORS(app)

# # ===============================
# # 2. Load dataset and scaler
# # ===============================
# data = pd.read_excel("gym recommendation.xlsx")  # your dataset

# # Encode categorical features
# data['Sex'] = data['Sex'].map({'Male': 1, 'Female': 0})
# data['Hypertension'] = data['Hypertension'].map({'Yes': 1, 'No': 0})
# data['Diabetes'] = data['Diabetes'].map({'Yes': 1, 'No': 0})
# level_map = {'Normal': 0, 'Obese': 1, 'Overweight': 2, 'Underweight': 3}
# goal_map = {'Weight Gain': 0, 'Weight Loss': 1}
# fitness_type_map = {'Cardio Fitness': 0, 'Muscular Fitness': 1}

# data['Level'] = data['Level'].map(level_map)
# data['Fitness Goal'] = data['Fitness Goal'].map(goal_map)
# data['Fitness Type'] = data['Fitness Type'].map(fitness_type_map)

# # Load pre-fitted scaler
# with open("diet_scaler.pkl", "rb") as f:
#     scaler = pickle.load(f)

# # ===============================
# # 3. Expected Input Features
# # ===============================
# FEATURES = [
#     "Sex", "Age", "Height", "Weight", "Hypertension", "Diabetes",
#     "BMI", "Level", "Fitness Goal", "Fitness Type"
# ]
# NUM_FEATURES = ["Age", "Height", "Weight", "BMI"]

# # ===============================
# # 4. Recommendation Function
# # ===============================
# def recommend(user_input, top_n=3):
#     user_df = pd.DataFrame([user_input])

#     print("📊 Before scaling:")
#     print(user_df[NUM_FEATURES].dtypes)
#     print(user_df[NUM_FEATURES])

#     # Ensure numeric conversion
#     user_df[NUM_FEATURES] = user_df[NUM_FEATURES].apply(pd.to_numeric, errors="coerce")

#     # Check for NaNs before scaling
#     if user_df[NUM_FEATURES].isnull().any().any():
#         raise ValueError(f"NaN values found before scaling: {user_df[NUM_FEATURES].isnull().sum().to_dict()}")

#     # Scale numeric features
#     scaled = scaler.transform(user_df[NUM_FEATURES])
#     print("✅ Scaled output:", scaled)

#     user_df[NUM_FEATURES] = scaled
#     user_input.update(user_df.iloc[0].to_dict())

#     # Continue your similarity logic below...



# # ===============================
# # 5. Flask Routes
# # ===============================
# @app.route("/", methods=["GET"])
# def home():
#     return "✅ Diet Recommendation Flask server is running!"

# @app.route("/recommend", methods=["POST"])
# def recommend_api():
#     try:
#         user_input = request.get_json(force=True)
#         print("\n📦 Received JSON from frontend:")
#         print(user_input)   # 👈 print what came from React

#         missing = [f for f in FEATURES if f not in user_input]
#         if missing:
#             print("❌ Missing features:", missing)
#             return jsonify({"error": f"Missing features: {missing}"}), 400

#         recommendations = recommend(user_input)
#         return jsonify({"recommendations": recommendations})

#     except Exception as e:
#         print("🔥 Exception:", e)
#         return jsonify({"error": str(e)}), 400


# # ===============================
# # 6. Run Flask server
# # ===============================
# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5001, debug=True)



# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import numpy as np
# from sklearn.preprocessing import StandardScaler
# from sklearn.metrics.pairwise import cosine_similarity
# import random
# import pickle

# # ===============================
# # 1. Initialize Flask
# # ===============================
# app = Flask(__name__)
# CORS(app)

# # ===============================
# # 2. Load dataset and scaler
# # ===============================
# data = pd.read_excel("gym recommendation.xlsx")

# # Fix typos
# data['Level'] = data['Level'].replace({'Obuse': 'Obese'})

# # Encode categorical features
# data['Sex'] = data['Sex'].map({'Male': 1, 'Female': 0})
# data['Hypertension'] = data['Hypertension'].map({'Yes': 1, 'No': 0})
# data['Diabetes'] = data['Diabetes'].map({'Yes': 1, 'No': 0})

# level_map = {'Normal': 0, 'Obese': 1, 'Overweight': 2, 'Underweight': 3}
# goal_map = {'Weight Gain': 0, 'Weight Loss': 1}
# fitness_type_map = {'Cardio Fitness': 0, 'Muscular Fitness': 1}

# data['Level'] = data['Level'].map(level_map)
# data['Fitness Goal'] = data['Fitness Goal'].map(goal_map)
# data['Fitness Type'] = data['Fitness Type'].map(fitness_type_map)

# # Load pre-fitted scaler
# with open("diet_scaler.pkl", "rb") as f:
#     scaler = pickle.load(f)

# # ===============================
# # 3. Features
# # ===============================
# FEATURES = ["Sex", "Age", "Height", "Weight", "Hypertension", "Diabetes",
#             "BMI", "Level", "Fitness Goal", "Fitness Type"]
# NUM_FEATURES = ["Age", "Height", "Weight", "BMI"]

# # ===============================
# # 4. Recommendation Logic
# # ===============================
# def recommend(user_input, top_n=3):
#     user_df = pd.DataFrame([user_input])

#     # Ensure numeric conversion
#     user_df[NUM_FEATURES] = user_df[NUM_FEATURES].apply(pd.to_numeric, errors="coerce")

#     # Scale numeric features
#     user_df[NUM_FEATURES] = scaler.transform(user_df[NUM_FEATURES])
#     user_input.update(user_df.iloc[0].to_dict())

#     # Similarity calculation
#     similarity_scores = cosine_similarity(data[FEATURES], pd.DataFrame([user_input])).flatten()
#     similar_indices = similarity_scores.argsort()[-5:][::-1]
#     similar_users = data.iloc[similar_indices]

#     # Base recommendation
#     base_rec = similar_users[['Exercises', 'Diet', 'Equipment']].mode().iloc[0]

#     # Generate variations
#     recs = [base_rec.to_dict()]
#     for _ in range(2):
#         modified_input = user_input.copy()
#         modified_input['Age'] += random.randint(-3, 3)
#         modified_input['Weight'] += random.uniform(-3, 3)
#         modified_input['BMI'] += random.uniform(-0.5, 0.5)

#         mod_df = pd.DataFrame([modified_input])
#         mod_df[NUM_FEATURES] = scaler.transform(mod_df[NUM_FEATURES])
#         modified_input.update(mod_df.iloc[0].to_dict())

#         mod_scores = cosine_similarity(data[FEATURES], pd.DataFrame([modified_input])).flatten()
#         mod_indices = mod_scores.argsort()[-5:][::-1]
#         mod_users = data.iloc[mod_indices]
#         mod_rec = mod_users[['Exercises', 'Diet', 'Equipment']].mode().iloc[0].to_dict()

#         if mod_rec not in recs:
#             recs.append(mod_rec)

#     return recs

# # ===============================
# # 5. Flask Routes
# # ===============================
# @app.route("/", methods=["GET"])
# def home():
#     return "✅ Diet + Workout Recommendation Flask server is running!"

# @app.route("/recommend", methods=["POST"])
# def recommend_api():
#     try:
#         user_input = request.get_json(force=True)
#         print("\n📦 Received JSON from frontend:")
#         print(user_input)

#         missing = [f for f in FEATURES if f not in user_input]
#         if missing:
#             return jsonify({"error": f"Missing features: {missing}"}), 400

#         recs = recommend(user_input)
#         return jsonify({"recommendations": recs})

#     except Exception as e:
#         print("🔥 Exception:", e)
#         return jsonify({"error": str(e)}), 400

# # ===============================
# # 6. Run Server
# # ===============================
# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5001, debug=True)




from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.metrics.pairwise import cosine_similarity
import random

# ===============================
# 1. Initialize Flask
# ===============================
app = Flask(__name__)
CORS(app)

# ===============================
# 2. Load dataset
# ===============================
data = pd.read_excel("gym recommendation.xlsx")

# ===============================
# 3. Fix typos and encode categorical features
# ===============================
data['Level'] = data['Level'].replace({'Obuse': 'Obese'})

data['Sex'] = data['Sex'].map({'Male': 1, 'Female': 0})
data['Hypertension'] = data['Hypertension'].map({'Yes': 1, 'No': 0})
data['Diabetes'] = data['Diabetes'].map({'Yes': 1, 'No': 0})

level_map = {'Normal': 0, 'Obese': 1, 'Overweight': 2, 'Underweight': 3}
goal_map = {'Weight Gain': 0, 'Weight Loss': 1}
fitness_type_map = {'Cardio Fitness': 0, 'Muscular Fitness': 1}

data['Level'] = data['Level'].map(level_map)
data['Fitness Goal'] = data['Fitness Goal'].map(goal_map)
data['Fitness Type'] = data['Fitness Type'].map(fitness_type_map)

# ===============================
# 4. Scale numeric features
# ===============================
num_features = ['Age', 'Height', 'Weight', 'BMI']
scaler = StandardScaler()
data[num_features] = scaler.fit_transform(data[num_features])

# ===============================
# 5. Recommendation Logic
# ===============================
def get_recommendation(user_input):
    try:
        # Convert and scale user input
        user_df = pd.DataFrame([user_input])
        user_df[num_features] = scaler.transform(user_df[num_features])
        user_input.update(user_df.iloc[0].to_dict())

        feature_cols = ['Sex', 'Age', 'Height', 'Weight', 'Hypertension',
                        'Diabetes', 'BMI', 'Level', 'Fitness Goal', 'Fitness Type']

        # Similarity calculation
        similarity_scores = cosine_similarity(data[feature_cols], pd.DataFrame([user_input])).flatten()
        similar_user_indices = similarity_scores.argsort()[-5:][::-1]
        similar_users = data.iloc[similar_user_indices]
        recommendation_1 = similar_users[['Exercises', 'Diet', 'Equipment']].mode().iloc[0]

        # Generate two variations
        simulated_recommendations = []
        for _ in range(2):
            modified_input = user_input.copy()
            modified_input['Age'] += random.randint(-3, 3)
            modified_input['Weight'] += random.uniform(-3, 3)
            modified_input['BMI'] += random.uniform(-0.5, 0.5)

            modified_df = pd.DataFrame([modified_input])
            modified_df[num_features] = scaler.transform(modified_df[num_features])
            modified_input.update(modified_df.iloc[0].to_dict())

            modified_scores = cosine_similarity(data[feature_cols], pd.DataFrame([modified_input])).flatten()
            modified_indices = modified_scores.argsort()[-5:][::-1]
            modified_users = data.iloc[modified_indices]
            rec = modified_users[['Exercises', 'Diet', 'Equipment']].mode().iloc[0]

            if not any(
                rec['Exercises'] == r['Exercises'] and
                rec['Diet'] == r['Diet'] and
                rec['Equipment'] == r['Equipment']
                for r in simulated_recommendations
            ):
                simulated_recommendations.append(rec)

        # ======= Console Output Style =======
        print("\nRecommended Workout and Diet Plans:")
        print("\nRecommendation 1 (Exact match):")
        print("Exercises:", recommendation_1['Exercises'])
        print("Diet:", recommendation_1['Diet'])
        print("Equipment:", recommendation_1['Equipment'])

        for idx, rec in enumerate(simulated_recommendations, start=2):
            print(f"\nRecommendation {idx} (Slight variation):")
            print("Exercises:", rec['Exercises'])
            print("Diet:", rec['Diet'])
            print("Equipment:", rec['Equipment'])

        # Return recommendations as JSON-compatible list
        recs = [recommendation_1] + simulated_recommendations
        return [r.to_dict() for r in recs]

    except Exception as e:
        print("🔥 Exception in recommendation:", e)
        return None

# ===============================
# 6. Flask Routes
# ===============================
@app.route("/", methods=["GET"])
def home():
    return "✅ Diet + Workout Recommendation Flask server is running!"

@app.route("/recommend", methods=["POST"])
def recommend_api():
    try:
        user_input = request.get_json(force=True)
        print("\n📦 Received JSON from frontend:")
        print(user_input)

        # Ensure required keys exist
        required = ['Sex', 'Age', 'Height', 'Weight', 'Hypertension', 'Diabetes',
                    'BMI', 'Level', 'Fitness Goal', 'Fitness Type']
        missing = [f for f in required if f not in user_input]
        if missing:
            return jsonify({"error": f"Missing keys: {missing}"}), 400

        recs = get_recommendation(user_input)
        if recs is None:
            return jsonify({"error": "Recommendation failed"}), 400

        return jsonify({"recommendations": recs}), 200

    except Exception as e:
        print("🔥 Exception:", e)
        return jsonify({"error": str(e)}), 400

# ===============================
# 7. Run Server
# ===============================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)

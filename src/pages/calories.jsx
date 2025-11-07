// // import { useState } from "react";
// // import axios from "axios";
// // import { getDatabase, ref, push } from "firebase/database";
// // import { app } from "../firebase";

// // // Optional: Error Boundary
// // // import ErrorBoundary from "../components/ErrorBoundary";

// // export default function Calories() {
// //   const db = getDatabase(app);

// //   // Form state
// //   const [age, setAge] = useState("");
// //   const [gender, setGender] = useState("Male");
// //   const [weight, setWeight] = useState("");
// //   const [height, setHeight] = useState("");
// //   const [avgBPM, setAvgBPM] = useState("");
// //   const [sessionDuration, setSessionDuration] = useState("");
// //   const [fatPercentage, setFatPercentage] = useState("");
// //   const [waterIntake, setWaterIntake] = useState("");
// //   const [workoutFrequency, setWorkoutFrequency] = useState("");
// //   const [experienceLevel, setExperienceLevel] = useState("");
// //   const [bmi, setBmi] = useState("");

// //   const [calories, setCalories] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     // ✅ Clean keys for Firebase and Flask (replace invalid chars)
// //     const formData = {
// //       Age: parseInt(age),
// //       Gender: gender === "Male" ? 0 : 1,
// //       Weight_kg: parseFloat(weight),
// //       Height_m: parseFloat(height),
// //       Avg_BPM: parseInt(avgBPM),
// //       Session_Duration_hours: parseFloat(sessionDuration),
// //       Fat_Percentage: parseFloat(fatPercentage),
// //       Water_Intake_liters: parseFloat(waterIntake),
// //       Workout_Frequency_days_week: parseInt(workoutFrequency),
// //       Experience_Level: parseInt(experienceLevel),
// //       BMI: parseFloat(bmi),
// //     };

// //     try {
// //       // 1️⃣ Push to Firebase safely
// //       await push(ref(db, "calories_inputs"), formData);

// //       // 2️⃣ Send to Flask API
// //       const response = await axios.post("http://127.0.0.1:5000/predict", formData);

// //       // Defensive check
// //       if (response.data && response.data.calories !== undefined) {
// //         setCalories(response.data.calories);
// //       } else {
// //         setCalories(null);
// //         alert("Prediction failed. Invalid response from server.");
// //       }
// //     } catch (error) {
// //       console.error("Error:", error);
// //       alert("Something went wrong! Check console for details.");
// //     }

// //     setLoading(false);
// //   };

// //   return (
    
// //       <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
// //         <h2>Calories Predictor</h2>
// //         <form onSubmit={handleSubmit}>
// //           <input placeholder="Age" type="number" value={age} onChange={e => setAge(e.target.value)} required />
// //           <select value={gender} onChange={e => setGender(e.target.value)}>
// //             <option>Male</option>
// //             <option>Female</option>
// //           </select>
// //           <input placeholder="Weight (kg)" type="number" value={weight} onChange={e => setWeight(e.target.value)} required />
// //           <input placeholder="Height (m)" type="number" value={height} onChange={e => setHeight(e.target.value)} required />
// //           <input placeholder="Avg BPM" type="number" value={avgBPM} onChange={e => setAvgBPM(e.target.value)} required />
// //           <input placeholder="Session Duration (hours)" type="number" value={sessionDuration} onChange={e => setSessionDuration(e.target.value)} required />
// //           <input placeholder="Fat Percentage" type="number" value={fatPercentage} onChange={e => setFatPercentage(e.target.value)} required />
// //           <input placeholder="Water Intake (liters)" type="number" value={waterIntake} onChange={e => setWaterIntake(e.target.value)} required />
// //           <input placeholder="Workout Frequency (days/week)" type="number" value={workoutFrequency} onChange={e => setWorkoutFrequency(e.target.value)} required />
// //           <input placeholder="Experience Level" type="number" value={experienceLevel} onChange={e => setExperienceLevel(e.target.value)} required />
// //           <input placeholder="BMI" type="number" value={bmi} onChange={e => setBmi(e.target.value)} required />

// //           <button type="submit" disabled={loading}>
// //             {loading ? "Calculating..." : "Predict Calories"}
// //           </button>
// //         </form>

// //         {calories !== null && !isNaN(calories) && (
// //           <div style={{ marginTop: "20px", fontWeight: "bold" }}>
// //             🔥 Predicted Calories Burned: {calories.toFixed(2)} kcal
// //           </div>
// //         )}
// //       </div>
    
// //   );
// // }


// import { useState } from "react";
// import axios from "axios";
// import { getDatabase, ref, push } from "firebase/database";
// import { app } from "../firebase";

// export default function Calories() {
//   const db = getDatabase(app);

//   // Form state
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("Male");
//   const [weight, setWeight] = useState("");
//   const [height, setHeight] = useState("");
//   const [avgBPM, setAvgBPM] = useState("");
//   const [sessionDuration, setSessionDuration] = useState("");
//   const [fatPercentage, setFatPercentage] = useState("");
//   const [waterIntake, setWaterIntake] = useState("");
//   const [workoutFrequency, setWorkoutFrequency] = useState("");
//   const [experienceLevel, setExperienceLevel] = useState("");
//   const [bmi, setBmi] = useState("");

//   const [calories, setCalories] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Original keys for Flask API
//     const flaskData = {
//       "Age": parseInt(age),
//       "Gender": gender === "Male" ? 0 : 1,
//       "Weight (kg)": parseFloat(weight),
//       "Height (m)": parseFloat(height),
//       "Avg_BPM": parseInt(avgBPM),
//       "Session_Duration (hours)": parseFloat(sessionDuration),
//       "Fat_Percentage": parseFloat(fatPercentage),
//       "Water_Intake (liters)": parseFloat(waterIntake),
//       "Workout_Frequency (days/week)": parseInt(workoutFrequency),
//       "Experience_Level": parseInt(experienceLevel),
//       "BMI": parseFloat(bmi),
//     };

//     // Firebase-safe keys
//     const firebaseData = {
//       Age: flaskData["Age"],
//       Gender: flaskData["Gender"],
//       Weight_kg: flaskData["Weight (kg)"],
//       Height_m: flaskData["Height (m)"],
//       Avg_BPM: flaskData["Avg_BPM"],
//       Session_Duration_hours: flaskData["Session_Duration (hours)"],
//       Fat_Percentage: flaskData["Fat_Percentage"],
//       Water_Intake_liters: flaskData["Water_Intake (liters)"],
//       Workout_Frequency_days_week: flaskData["Workout_Frequency (days/week)"],
//       Experience_Level: flaskData["Experience_Level"],
//       BMI: flaskData["BMI"],
//     };

//     try {
//       // 1️⃣ Push to Firebase
//       await push(ref(db, "calories_inputs"), firebaseData);

//       // 2️⃣ Send to Flask API
//       const response = await axios.post("http://127.0.0.1:5000/predict", flaskData);

//       setCalories(response.data.per_session); // display per session calories
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Something went wrong! Check console for details.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
//       <h2>Calories Predictor</h2>
//       <form onSubmit={handleSubmit}>
//         <input placeholder="Age" type="number" value={age} onChange={e => setAge(e.target.value)} required />
//         <select value={gender} onChange={e => setGender(e.target.value)}>
//           <option>Male</option>
//           <option>Female</option>
//         </select>
//         <input placeholder="Weight (kg)" type="number" value={weight} onChange={e => setWeight(e.target.value)} required />
//         <input placeholder="Height (m)" type="number" value={height} onChange={e => setHeight(e.target.value)} required />
//         <input placeholder="Avg BPM" type="number" value={avgBPM} onChange={e => setAvgBPM(e.target.value)} required />
//         <input placeholder="Session Duration (hours)" type="number" value={sessionDuration} onChange={e => setSessionDuration(e.target.value)} required />
//         <input placeholder="Fat Percentage" type="number" value={fatPercentage} onChange={e => setFatPercentage(e.target.value)} required />
//         <input placeholder="Water Intake (liters)" type="number" value={waterIntake} onChange={e => setWaterIntake(e.target.value)} required />
//         <input placeholder="Workout Frequency (days/week)" type="number" value={workoutFrequency} onChange={e => setWorkoutFrequency(e.target.value)} required />
//         <input placeholder="Experience Level" type="number" value={experienceLevel} onChange={e => setExperienceLevel(e.target.value)} required />
//         <input placeholder="BMI" type="number" value={bmi} onChange={e => setBmi(e.target.value)} required />

//         <button type="submit" disabled={loading}>
//           {loading ? "Calculating..." : "Predict Calories"}
//         </button>
//       </form>

//       {calories !== null && (
//         <div style={{ marginTop: "20px", fontWeight: "bold" }}>
//           🔥 Predicted Calories Burned: {calories.toFixed(2)} kcal
//         </div>
//       )}
//     </div>
//   );
// }


import { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push } from "firebase/database";
import { app } from "../firebase";
import "./calories.css";

export default function Calories() {
  const db = getDatabase(app);
  const auth = getAuth();

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [avgBPM, setAvgBPM] = useState("");
  const [sessionDuration, setSessionDuration] = useState("");
  const [fatPercentage, setFatPercentage] = useState("");
  const [waterIntake, setWaterIntake] = useState("");
  const [workoutFrequency, setWorkoutFrequency] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [bmi, setBmi] = useState("");

  const [calories, setCalories] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Match Flask API keys
    const flaskData = {
      "Age": parseInt(age),
      "Gender": gender === "Male" ? 0 : 1,
      "Weight (kg)": parseFloat(weight),
      "Height (m)": parseFloat(height),
      "Avg_BPM": parseInt(avgBPM),
      "Session_Duration (hours)": parseFloat(sessionDuration),
      "Fat_Percentage": parseFloat(fatPercentage),
      "Water_Intake (liters)": parseFloat(waterIntake),
      "Workout_Frequency (days/week)": parseInt(workoutFrequency),
      "Experience_Level": parseInt(experienceLevel),
      "BMI": parseFloat(bmi),
    };

    // Firebase-safe keys
    const firebaseData = {
      Age: flaskData["Age"],
      Gender: flaskData["Gender"],
      Weight_kg: flaskData["Weight (kg)"],
      Height_m: flaskData["Height (m)"],
      Avg_BPM: flaskData["Avg_BPM"],
      Session_Duration_hours: flaskData["Session_Duration (hours)"],
      Fat_Percentage: flaskData["Fat_Percentage"],
      Water_Intake_liters: flaskData["Water_Intake (liters)"],
      Workout_Frequency_days_week: flaskData["Workout_Frequency (days/week)"],
      Experience_Level: flaskData["Experience_Level"],
      BMI: flaskData["BMI"],
    };

    try {
      // 1️⃣ Call Flask API
      const response = await axios.post("http://127.0.0.1:5000/predict", flaskData);

      // ✅ Extract backend predictions
      const { per_session, per_week, per_month } = response.data;
      setCalories({ per_session, per_week, per_month });

      // 2️⃣ Prepare full entry for Firebase
      const firebaseEntry = {
        ...firebaseData,
        per_session,
        per_week,
        per_month,
        timestamp: Date.now(),
      };

      // 3️⃣ Save under the current user in Firebase
      const user = auth.currentUser;
      if (user) {
        await push(ref(db, `calories_predictions/${user.uid}`), firebaseEntry);
      } else {
        console.warn("⚠️ User not logged in. Prediction not saved.");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while predicting. Please check the console.");
    }

    setLoading(false);
  };

  return (
    <div className="calories-page">
      <div className="calories-container">
        <h2>Calories Predictor</h2>

        <form className="calories-form" onSubmit={handleSubmit}>
          <input placeholder="Age" type="number" value={age} onChange={e => setAge(e.target.value)} required />
          <select value={gender} onChange={e => setGender(e.target.value)}>
            <option>Male</option>
            <option>Female</option>
          </select>
          <input placeholder="Weight (kg)" type="number" value={weight} onChange={e => setWeight(e.target.value)} required />
          <input placeholder="Height (m)" type="number" value={height} onChange={e => setHeight(e.target.value)} required />
          <input placeholder="Avg BPM" type="number" value={avgBPM} onChange={e => setAvgBPM(e.target.value)} required />
          <input placeholder="Session Duration (hours)" type="number" value={sessionDuration} onChange={e => setSessionDuration(e.target.value)} required />
          <input placeholder="Fat Percentage" type="number" value={fatPercentage} onChange={e => setFatPercentage(e.target.value)} required />
          <input placeholder="Water Intake (liters)" type="number" value={waterIntake} onChange={e => setWaterIntake(e.target.value)} required />
          <input placeholder="Workout Frequency (days/week)" type="number" value={workoutFrequency} onChange={e => setWorkoutFrequency(e.target.value)} required />
          <input placeholder="Experience Level" type="number" value={experienceLevel} onChange={e => setExperienceLevel(e.target.value)} required />
          <input placeholder="BMI" type="number" value={bmi} onChange={e => setBmi(e.target.value)} required />

          <button type="submit" disabled={loading}>
            {loading ? "Calculating..." : "Predict Calories"}
          </button>
        </form>

        {calories && (
          <div className="calories-result">
            <p>🔥 <strong>Per Session:</strong> {calories.per_session.toFixed(2)} kcal</p>
            <p>📅 <strong>Per Week:</strong> {calories.per_week.toFixed(2)} kcal</p>
            <p>🗓️ <strong>Per Month:</strong> {calories.per_month.toFixed(2)} kcal</p>
          </div>
        )}
      </div>
    </div>
  );
}




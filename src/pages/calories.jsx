import { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push } from "firebase/database";
import { app } from "../firebase";
import "./calories.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Calories() {
  const db = getDatabase(app);
  const auth = getAuth();

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [avgBPM, setAvgBPM] = useState("");
  const [sessionDuration, setSessionDuration] = useState("");
  const [fatPercentage, setFatPercentage] = useState("");
  const [waterIntake, setWaterIntake] = useState("");
  const [workoutFrequency, setWorkoutFrequency] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");

  const [calories, setCalories] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const flaskData = {
      Age: parseInt(age),
      Gender: gender === "Male" ? 0 : 1,
      Weight: parseFloat(weight),
      Weight_Unit: weightUnit,
      Height_Feet: parseFloat(heightFeet),
      Height_Inches: parseFloat(heightInches),
      Avg_BPM: parseInt(avgBPM),
      "Session_Duration (hours)": parseFloat(sessionDuration),
      Fat_Percentage: parseFloat(fatPercentage),
      "Water_Intake (liters)": parseFloat(waterIntake),
      "Workout_Frequency (days/week)": parseInt(workoutFrequency),
      Experience_Level: parseInt(experienceLevel),
    };

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", flaskData);
      const { per_session, per_week, per_month, input } = response.data;

      setCalories({
        per_session,
        per_week,
        per_month,
        bmi: input?.BMI,
      });

      const user = auth.currentUser;
      if (user) {
        const dbEntry = {
          ...flaskData,
          computed_BMI: input?.BMI,
          per_session,
          per_week,
          per_month,
          timestamp: Date.now(),
        };
        await push(ref(db, `calories_predictions/${user.uid}`), dbEntry);
      }
    } catch (err) {
      console.error("Prediction Error:", err);
      alert("Error: Unable to predict. Please check the backend.");
    }

    setLoading(false);
  };

  return (
    <div className="calories-page">
      <div className="calories-container">
        <h2>🔥 Calories Predictor</h2>

        <form className="calories-form" onSubmit={handleSubmit}>
          <input placeholder="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option>Male</option>
            <option>Female</option>
          </select>

          <div className="input-row">
            <input placeholder="Weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
            <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>

          <div className="input-row">
            <input placeholder="Height (ft)" type="number" value={heightFeet} onChange={(e) => setHeightFeet(e.target.value)} required />
            <input placeholder="Height (in)" type="number" value={heightInches} onChange={(e) => setHeightInches(e.target.value)} required />
          </div>

          <input placeholder="Avg BPM" type="number" value={avgBPM} onChange={(e) => setAvgBPM(e.target.value)} required />
          <input placeholder="Session Duration (hours)" type="number" value={sessionDuration} onChange={(e) => setSessionDuration(e.target.value)} required />
          <input placeholder="Fat Percentage" type="number" value={fatPercentage} onChange={(e) => setFatPercentage(e.target.value)} required />
          <input placeholder="Water Intake (liters)" type="number" value={waterIntake} onChange={(e) => setWaterIntake(e.target.value)} required />
          <input placeholder="Workout Frequency (days/week)" type="number" value={workoutFrequency} onChange={(e) => setWorkoutFrequency(e.target.value)} required />
          <input placeholder="Experience Level" type="number" value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)} required />

          <button type="submit" disabled={loading}>
            {loading ? <><span className="loading-spinner"></span>Calculating...</> : "Predict Calories"}
          </button>
        </form>

        {calories && (
          <div className="calories-result">
            <p>🔥 <strong>Per Session:</strong> {calories.per_session.toFixed(2)} kcal</p>
            <p>📅 <strong>Per Week:</strong> {calories.per_week.toFixed(2)} kcal</p>
            <p>🗓️ <strong>Per Month:</strong> {calories.per_month.toFixed(2)} kcal</p>
            <p>🧮 <strong>Calculated BMI:</strong> {calories.bmi?.toFixed(2)}</p>

            <div style={{ height: 200, marginTop: 20 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: "Per Session", value: calories.per_session },
                  { name: "Per Week", value: calories.per_week },
                  { name: "Per Month", value: calories.per_month },
                ]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2892D7" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

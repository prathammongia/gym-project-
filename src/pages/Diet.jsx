



import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import "./Diet.css";

function DietPage() {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setError("❌ You must be logged in to view your diet plan.");
      setLoading(false);
      return;
    }

    const db = getDatabase();

    const fetchData = async () => {
      try {
        // Load plans
        const plansRes = await fetch("/diet_plans.json");
        const plansData = await plansRes.json();
        setPlans(plansData);

        // Get user's stored diet profile
        const snapshot = await get(ref(db, `users/${user.uid}/dietProfile`));
        const dietData = snapshot.val();

        if (!dietData) {
          setError("❌ Diet profile not found. Please register again.");
          setLoading(false);
          return;
        }

        const { goal, level, gender, dietPref, workoutStyle } = dietData;

        const match = plansData.find(
          (item) =>
            item.Goal.trim().toLowerCase() === goal.trim().toLowerCase() &&
            item.FitnessLevel.trim().toLowerCase() === level.trim().toLowerCase() &&
            item.DietaryPreference.trim().toLowerCase() === dietPref.trim().toLowerCase() &&
            item.WorkoutStyle.trim().toLowerCase() === workoutStyle.trim().toLowerCase()
        );

        if (!match) {
          setError("❌ No matching plan found for your profile.");
        } else {
          setResult(match);
        }

      } catch (err) {
        console.error(err);
        setError("❌ Failed to load plan. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="diet-container">
      <h2 className="diet-heading">💪 Your Personalized Diet & Workout Plan</h2>

      {loading && <p className="diet-loading">⏳ Loading your plan...</p>}

      {error && <p className="diet-error">{error}</p>}

      {!loading && result && (
        <div className="diet-result">
          <h3>🏋️‍♂️ Workout Plan</h3>
          <p>Days/Week: {result.WorkoutPlan.DaysPerWeek}</p>
          <ul>
            {result.WorkoutPlan.Plan.map((day, i) => (
              <li key={i}>{day}</li>
            ))}
          </ul>

          <h3>🍽️ Diet Plan</h3>
          <ul>
            {Object.entries(result.DietPlan).map(([meal, desc]) => (
              <li key={meal}>
                <strong>{meal}:</strong> {desc}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DietPage;

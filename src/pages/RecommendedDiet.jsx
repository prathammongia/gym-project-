import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../firebase";
import "./DietRecommend.css";

export default function RecommendedDiet() {
  const db = getDatabase(app);
  const auth = getAuth();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = ref(db, `diet_recommendations/${user.uid}`);
    onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const arr = Object.values(data).sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setHistory(arr);
      } else {
        setHistory([]);
      }
    });
  }, []);

  return (
    <div className="diet-page">
      <div className="diet-container">
        <h2>📜 Your Diet Recommendation History</h2>

        {history.length === 0 ? (
          <p>No diet recommendations yet.</p>
        ) : (
          <div className="diet-results">
            {history.map((entry, i) => (
              <div key={i} className="diet-box">
                <h4>Recommendation {i + 1}</h4>
                <p><strong>Date:</strong> {new Date(entry.timestamp).toLocaleString()}</p>
                {entry.recommendations?.map((rec, j) => (
                  <div key={j} className="diet-subbox">
                    <p><strong>🏋️ Exercises:</strong> {rec.Exercises}</p>
                    <p><strong>🥗 Diet:</strong> {rec.Diet}</p>
                    <p><strong>🎯 Equipment:</strong> {rec.Equipment}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

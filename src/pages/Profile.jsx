// import React, { useEffect, useRef, useState } from "react";
// import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
// import { getDatabase, ref, get } from "firebase/database";
// import { useNavigate } from "react-router-dom";
// import { Pencil, LogOut } from "lucide-react";
// import "./Profile.css";

// export default function Profile({ onClose }) {
//   const auth = getAuth();
//   const db = getDatabase();
//   const navigate = useNavigate();
//   const containerRef = useRef(null); // ref to detect outside clicks

//   const [profile, setProfile] = useState({
//     name: "",
//     age: "",
//     weight: "",
//     email: "",
//     dietProfile: {},
//   });

//   // Fetch profile data
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const snapshot = await get(ref(db, `users/${user.uid}`));
//         if (snapshot.exists()) {
//           setProfile(snapshot.val());
//         }
//       } else {
//         navigate("/login");
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // Close on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (containerRef.current && !containerRef.current.contains(event.target)) {
//         if (onClose) onClose();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [onClose]);

//   const handleCloseAndNavigate = (path) => {
//     if (onClose) onClose();
//     setTimeout(() => {
//       navigate(path);
//     }, 300);
//   };

//   const handleLogout = () => {
//     signOut(auth).then(() => navigate("/login"));
//   };

//   return (
//     <div className="profile-backdrop">
//       <div className="profile-container slide-in" ref={containerRef}>
//         <div className="profile-header">
//           <h2 className="profile-title">👤 <span>Your Profile</span></h2>
//           <button onClick={handleLogout} className="profile-btn">
//             <LogOut size={16} />
//             Logout
//           </button>
//         </div>

//         <div className="profile-summary">
//           <p><strong>Full Name:</strong> {profile.name}</p>
//           <p><strong>Email:</strong> {profile.email}</p>
//           <p><strong>Age:</strong> {profile.age}</p>
//           <p><strong>Weight:</strong> {profile.weight} kg</p>
//         </div>

//         <div className="profile-buttons">
//           <button
//             onClick={() => handleCloseAndNavigate("/EditProfile")}
//             className="profile-btn"
//           >
//             <Pencil size={16} />
//             Edit Profile
//           </button>
//           <button
//             onClick={() => handleCloseAndNavigate("/CheckInHistory")}
//             className="profile-btn"
//           >
//             📜 Check-In History
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useRef, useState } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Pencil, LogOut } from "lucide-react";
import "./Profile.css";

export default function Profile({ onClose }) {
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [profile, setProfile] = useState({
    name: "",
    age: "",
    weight: "",
    email: "",
    dietProfile: {},
  });

  const [caloriesHistory, setCaloriesHistory] = useState([]);

  // Fetch profile data and calories history
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) setProfile(snapshot.val());

        // Listen for calories predictions
        const caloriesRef = ref(db, `calories_predictions/${user.uid}`);
        onValue(caloriesRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const history = Object.entries(data).map(([key, value]) => ({
              id: key,
              ...value,
            }));
            // Sort by timestamp descending
            history.sort((a, b) => b.timestamp - a.timestamp);
            setCaloriesHistory(history);
          } else {
            setCaloriesHistory([]);
          }
        });
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        if (onClose) onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleCloseAndNavigate = (path) => {
    if (onClose) onClose();
    setTimeout(() => navigate(path), 300);
  };

  const handleLogout = () => {
    signOut(auth).then(() => navigate("/login"));
  };

  return (
    <div className="profile-backdrop">
      <div className="profile-container slide-in" ref={containerRef}>
        <div className="profile-header">
          <h2 className="profile-title">👤 <span>Your Profile</span></h2>
          <button onClick={handleLogout} className="profile-btn">
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="profile-summary">
          <p><strong>Full Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Age:</strong> {profile.age}</p>
          <p><strong>Weight:</strong> {profile.weight} kg</p>
        </div>

        <div className="profile-buttons">
          <button
            onClick={() => handleCloseAndNavigate("/EditProfile")}
            className="profile-btn"
          >
            <Pencil size={16} /> Edit Profile
          </button>
          <button
            onClick={() => handleCloseAndNavigate("/CheckInHistory")}
            className="profile-btn"
          >
            📜 Check-In History
          </button>
        </div>

        
        {/* 🔥 Calories Prediction History Section */}
        <div className="calories-history">
          <h3>🔥 Calories Burn History</h3>
          {caloriesHistory.length > 0 ? (
            <ul className="calories-list">
              {caloriesHistory.map((item) => (
                <li key={item.id} className="calories-item">
                  <p><strong>Per Session:</strong> {item.per_session.toFixed(2)} kcal</p>
                  <p><strong>Per Week:</strong> {item.per_week.toFixed(2)} kcal</p>
                  <p><strong>Per Month:</strong> {item.per_month.toFixed(2)} kcal</p>
                  <small>
                    📅 {new Date(item.timestamp).toLocaleString()}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-history">No calorie predictions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// // import React, { useState } from "react";
// // import axios from "axios";

// // export default function DietRecommend() {
// //   const [formData, setFormData] = useState({
// //     Sex: 1, // 1 = Male, 0 = Female
// //     Age: "",
// //     Height: "",
// //     Weight: "",
// //     Hypertension: 0, // 1 = Yes, 0 = No
// //     Diabetes: 0,     // 1 = Yes, 0 = No
// //     BMI: "",
// //     Level: 0,         // 0=Normal, 1=Obese, 2=Overweight, 3=Underweight
// //     "Fitness Goal": 1, // 0=Weight Gain, 1=Weight Loss
// //     "Fitness Type": 1  // 0=Cardio, 1=Muscular
// //   });

// //   const [recommendations, setRecommendations] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   // Handle Input Changes
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: Number(value) || value });
// //   };

// //   // Handle Form Submit
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError("");
// //     setRecommendations([]);

// //     try {
// //       console.log("📦 Sending data to backend:", formData);
// //       const res = await axios.post("http://127.0.0.1:5001/recommend", formData);
// //       console.log("✅ Response from backend:", res.data);
// //       setRecommendations(res.data.recommendations || []);
// //     } catch (err) {
// //       console.error("❌ Error:", err);
// //       setError("Failed to fetch recommendations. Check your input or backend.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
// //       <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl">
// //         <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">
// //           🥗 Personalized Diet Recommendation
// //         </h2>

// //         <form onSubmit={handleSubmit} className="space-y-3">
// //           {/* Age */}
// //           <input
// //             type="number"
// //             name="Age"
// //             placeholder="Age"
// //             value={formData.Age}
// //             onChange={handleChange}
// //             className="w-full border rounded-lg p-2"
// //             required
// //           />

// //           {/* Height */}
// //           <input
// //             type="number"
// //             name="Height"
// //             placeholder="Height (in meters, e.g., 1.75)"
// //             value={formData.Height}
// //             onChange={handleChange}
// //             step="0.01"
// //             className="w-full border rounded-lg p-2"
// //             required
// //           />

// //           {/* Weight */}
// //           <input
// //             type="number"
// //             name="Weight"
// //             placeholder="Weight (in kg)"
// //             value={formData.Weight}
// //             onChange={handleChange}
// //             className="w-full border rounded-lg p-2"
// //             required
// //           />

// //           {/* BMI */}
// //           <input
// //             type="number"
// //             name="BMI"
// //             placeholder="BMI (e.g., 24.5)"
// //             value={formData.BMI}
// //             onChange={handleChange}
// //             step="0.1"
// //             className="w-full border rounded-lg p-2"
// //             required
// //           />

// //           {/* Select Fields */}
// //           <select name="Sex" value={formData.Sex} onChange={handleChange} className="w-full border rounded-lg p-2">
// //             <option value={1}>Male</option>
// //             <option value={0}>Female</option>
// //           </select>

// //           <select name="Hypertension" value={formData.Hypertension} onChange={handleChange} className="w-full border rounded-lg p-2">
// //             <option value={0}>No Hypertension</option>
// //             <option value={1}>Has Hypertension</option>
// //           </select>

// //           <select name="Diabetes" value={formData.Diabetes} onChange={handleChange} className="w-full border rounded-lg p-2">
// //             <option value={0}>No Diabetes</option>
// //             <option value={1}>Has Diabetes</option>
// //           </select>

// //           <select name="Level" value={formData.Level} onChange={handleChange} className="w-full border rounded-lg p-2">
// //             <option value={0}>Normal</option>
// //             <option value={1}>Obese</option>
// //             <option value={2}>Overweight</option>
// //             <option value={3}>Underweight</option>
// //           </select>

// //           <select name="Fitness Goal" value={formData["Fitness Goal"]} onChange={handleChange} className="w-full border rounded-lg p-2">
// //             <option value={0}>Weight Gain</option>
// //             <option value={1}>Weight Loss</option>
// //           </select>

// //           <select name="Fitness Type" value={formData["Fitness Type"]} onChange={handleChange} className="w-full border rounded-lg p-2">
// //             <option value={0}>Cardio Fitness</option>
// //             <option value={1}>Muscular Fitness</option>
// //           </select>

// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full bg-indigo-600 text-white rounded-lg py-2 font-semibold hover:bg-indigo-700 transition"
// //           >
// //             {loading ? "Loading..." : "Get Diet Plan"}
// //           </button>
// //         </form>

// //         {/* Error */}
// //         {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

// //         {/* Recommendations */}
// //         {recommendations.length > 0 && (
// //   <div className="mt-6">
// //     <h3 className="text-lg font-semibold text-center text-gray-700">
      
// //     </h3>
// //     <div className="mt-3 space-y-3">
// //       {recommendations.length > 0 && (
// //   <div className="mt-6">
// //     <h3 className="text-lg font-semibold text-center text-gray-700">
// //       Recommended Workout & Diet Plans:
// //     </h3>
// //     <div className="mt-6 space-y-6">
// //   {recommendations.map((rec, index) => (
// //     <div
// //       key={index}
// //       className="bg-white text-black border border-gray-300 rounded-2xl shadow-lg p-5"
// //     >
// //       <h3 className="text-xl font-bold mb-3">
// //         Recommendation {index + 1}
// //       </h3>

// //       <div className="space-y-3">
// //         <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
// //           <p className="font-semibold">🏋️ Exercises:</p>
// //           <p className="ml-3">{rec.Exercises}</p>
// //         </div>

// //         <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
// //           <p className="font-semibold">🥗 Diet:</p>
// //           <p className="ml-3">{rec.Diet}</p>
// //         </div>

// //         <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
// //           <p className="font-semibold">🎯 Equipment:</p>
// //           <p className="ml-3">{rec.Equipment}</p>
// //         </div>
// //       </div>
// //     </div>
// //   ))}
// // </div>

// //   </div>
// // )}

// //     </div>
// //   </div>
// // )}

// //       </div>
// //     </div>
// //   );
// // }


// import React, { useState } from "react";
// import axios from "axios";
// import "./DietRecommend.css";

// export default function DietRecommend() {
//   const [formData, setFormData] = useState({
//     Sex: 1,
//     Age: "",
//     Height: "",
//     Weight: "",
//     Hypertension: 0,
//     Diabetes: 0,
//     BMI: "",
//     Level: 0,
//     "Fitness Goal": 1,
//     "Fitness Type": 1,
//   });

//   const [recommendations, setRecommendations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: Number(value) || value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setRecommendations([]);

//     try {
//       console.log("📦 Sending data to backend:", formData);
//       const res = await axios.post("http://127.0.0.1:5001/recommend", formData);
//       console.log("✅ Response from backend:", res.data);
//       setRecommendations(res.data.recommendations || []);
//     } catch (err) {
//       console.error("❌ Error:", err);
//       setError("Failed to fetch recommendations. Check your input or backend.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 px-4">
//       <div className="bg-blue shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
//         <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
//           🥗 Personalized Diet & Workout Recommendation
//         </h2>

//         {/* ======================= FORM ======================= */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {["Age", "Height", "Weight", "BMI"].map((field) => (
//             <input
//               key={field}
//               type="number"
//               name={field}
//               placeholder={`${field}${field === "Height" ? " (in meters)" : ""}`}
//               value={formData[field]}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
//               required
//             />
//           ))}

//           <select
//             name="Sex"
//             value={formData.Sex}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
//           >
//             <option value={1}>Male</option>
//             <option value={0}>Female</option>
//           </select>

//           <select
//             name="Hypertension"
//             value={formData.Hypertension}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
//           >
//             <option value={0}>No Hypertension</option>
//             <option value={1}>Has Hypertension</option>
//           </select>

//           <select
//             name="Diabetes"
//             value={formData.Diabetes}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
//           >
//             <option value={0}>No Diabetes</option>
//             <option value={1}>Has Diabetes</option>
//           </select>

//           <select
//             name="Level"
//             value={formData.Level}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
//           >
//             <option value={0}>Normal</option>
//             <option value={1}>Obese</option>
//             <option value={2}>Overweight</option>
//             <option value={3}>Underweight</option>
//           </select>

//           <select
//             name="Fitness Goal"
//             value={formData["Fitness Goal"]}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
//           >
//             <option value={0}>Weight Gain</option>
//             <option value={1}>Weight Loss</option>
//           </select>

//           <select
//             name="Fitness Type"
//             value={formData["Fitness Type"]}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
//           >
//             <option value={0}>Cardio Fitness</option>
//             <option value={1}>Muscular Fitness</option>
//           </select>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-[1.02]"
//           >
//             {loading ? "Loading..." : "Get Recommendations"}
//           </button>
//         </form>

//         {/* ======================= ERROR ======================= */}
//         {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

//         {/* ======================= RESULTS ======================= */}
//         {recommendations.length > 0 && (
//           <div className="mt-10">
//             <h3 className="text-2xl font-semibold text-center text-blue-500 mb-6">
//               Recommended Workout & Diet Plans
//             </h3>

//             <div className="space-y-6">
//               {recommendations.map((rec, index) => (
//                 <div
//                   key={index}
//                   className="bg-neutral-100 border border-gray-400 text-blue-500 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow"
//                 >
//                   <h4 className="text-xl font-bold mb-4 text-center">
//                     Recommendation {index + 1}
//                   </h4>

//                   <div className="space-y-4">
//                     <div className="p-3 border border-gray-300 rounded-lg bg-blue-200 shadow-sm">
//                       <p className="font-semibold text-black">🏋️ Exercises:</p>
//                       <p className="ml-3 text-gray-800">{rec.Exercises}</p>
//                     </div>

//                     <div className="p-3 border border-gray-300 rounded-lg bg-blue shadow-sm">
//                       <p className="font-semibold text-black">🥗 Diet:</p>
//                       <p className="ml-3 text-gray-800">{rec.Diet}</p>
//                     </div>

//                     <div className="p-3 border border-gray-300 rounded-lg bg-white shadow-sm">
//                       <p className="font-semibold text-black">🎯 Equipment:</p>
//                       <p className="ml-3 text-blue-500">{rec.Equipment}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




import React, { useState } from "react";
import axios from "axios";
import "./DietRecommend.css"; // Import the custom CSS

export default function DietRecommend() {
  const [formData, setFormData] = useState({
    Sex: 1,
    Age: "",
    Height: "",
    Weight: "",
    Hypertension: 0,
    Diabetes: 0,
    BMI: "",
    Level: 0,
    "Fitness Goal": 1,
    "Fitness Type": 1,
  });

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) || value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRecommendations([]);

    try {
      console.log("📦 Sending data to backend:", formData);
      const res = await axios.post("http://127.0.0.1:5001/recommend", formData);
      console.log("✅ Response from backend:", res.data);
      setRecommendations(res.data.recommendations || []);
    } catch (err) {
      console.error("❌ Error:", err);
      setError("Failed to fetch recommendations. Check your input or backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="diet-page">
      <div className="diet-container">
        <h2 className="title">🥗 Personalized Diet & Workout Recommendation</h2>

        {/* ======================= FORM ======================= */}
        <form onSubmit={handleSubmit} className="form">
          {["Age", "Height", "Weight", "BMI"].map((field) => (
            <input
              key={field}
              type="number"
              name={field}
              placeholder={`${field}${field === "Height" ? " (in meters)" : ""}`}
              value={formData[field]}
              onChange={handleChange}
              className="input-field"
              required
            />
          ))}

          <select name="Sex" value={formData.Sex} onChange={handleChange} className="input-field">
            <option value={1}>Male</option>
            <option value={0}>Female</option>
          </select>

          <select name="Hypertension" value={formData.Hypertension} onChange={handleChange} className="input-field">
            <option value={0}>No Hypertension</option>
            <option value={1}>Has Hypertension</option>
          </select>

          <select name="Diabetes" value={formData.Diabetes} onChange={handleChange} className="input-field">
            <option value={0}>No Diabetes</option>
            <option value={1}>Has Diabetes</option>
          </select>

          <select name="Level" value={formData.Level} onChange={handleChange} className="input-field">
            <option value={0}>Normal</option>
            <option value={1}>Obese</option>
            <option value={2}>Overweight</option>
            <option value={3}>Underweight</option>
          </select>

          <select name="Fitness Goal" value={formData["Fitness Goal"]} onChange={handleChange} className="input-field">
            <option value={0}>Weight Gain</option>
            <option value={1}>Weight Loss</option>
          </select>

          <select name="Fitness Type" value={formData["Fitness Type"]} onChange={handleChange} className="input-field">
            <option value={0}>Cardio Fitness</option>
            <option value={1}>Muscular Fitness</option>
          </select>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Loading..." : "Get Recommendations"}
          </button>
        </form>

        {/* ======================= ERROR ======================= */}
        {error && <p className="error-text">{error}</p>}

        {/* ======================= RESULTS ======================= */}
        {recommendations.length > 0 && (
          <div className="recommendation-container">
            <h3 className="recommendation-title">Recommended Workout & Diet Plans</h3>
            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <div key={index} className="recommendation-box">
                  <h4 className="recommendation-header">Recommendation {index + 1}</h4>

                  <div className="recommendation-section">
                    <p><strong>🏋️ Exercises:</strong> {rec.Exercises}</p>
                  </div>

                  <div className="recommendation-section">
                    <p><strong>🥗 Diet:</strong> {rec.Diet}</p>
                  </div>

                  <div className="recommendation-section">
                    <p><strong>🎯 Equipment:</strong> {rec.Equipment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

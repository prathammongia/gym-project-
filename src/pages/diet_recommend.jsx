import React, { useState } from "react";
import axios from "axios";
import "./DietRecommend.css"; // Import custom CSS

export default function DietRecommend() {
  const [formData, setFormData] = useState({
    Sex: 1,
    Age: "",
    Height_Feet: "",
    Height_Inches: "",
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

  // -----------------------------
  // 🧮 Compute BMI automatically
  // -----------------------------
  const calculateBMI = (weight, feet, inches) => {
    if (!weight || (!feet && !inches)) return "";
    const totalInches = parseFloat(feet || 0) * 12 + parseFloat(inches || 0);
    const heightM = totalInches * 0.0254; // convert inches to meters
    if (heightM <= 0) return "";
    const bmi = weight / (heightM * heightM);
    return bmi.toFixed(2);
  };

  // -----------------------------
  // Handle Form Input Changes
  // -----------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };

    // Auto BMI update when relevant fields change
    if (["Weight", "Height_Feet", "Height_Inches"].includes(name)) {
      const newBMI = calculateBMI(
        parseFloat(updated.Weight),
        parseFloat(updated.Height_Feet),
        parseFloat(updated.Height_Inches)
      );
      updated.BMI = newBMI;
    }

    setFormData(updated);
  };

  // -----------------------------
  // Submit Form
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRecommendations([]);

    try {
      // Prepare clean data for backend
      const requestData = {
        ...formData,
        Sex: Number(formData.Sex),
        Hypertension: Number(formData.Hypertension),
        Diabetes: Number(formData.Diabetes),
        Level: Number(formData.Level),
        "Fitness Goal": Number(formData["Fitness Goal"]),
        "Fitness Type": Number(formData["Fitness Type"]),
        BMI: parseFloat(formData.BMI),
        Height: (
          (parseFloat(formData.Height_Feet || 0) * 12 +
            parseFloat(formData.Height_Inches || 0)) *
          0.0254
        ).toFixed(2), // Convert feet/inches → meters
      };

      console.log("📦 Sending to backend:", requestData);

      const res = await axios.post("http://127.0.0.1:5001/recommend", requestData);
      console.log("✅ Response:", res.data);
      setRecommendations(res.data.recommendations || []);
    } catch (err) {
      console.error("❌ Error:", err);
      setError("Failed to fetch recommendations. Please check backend or input values.");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // JSX Render
  // -----------------------------
  return (
    <div className="diet-page">
      <div className="diet-container">
        <h2 className="title">🥗 Personalized Diet & Workout Recommendation</h2>

        {/* ======================= FORM ======================= */}
        <form onSubmit={handleSubmit} className="form">
          {/* Basic Inputs */}
          <input
            type="number"
            name="Age"
            placeholder="Age"
            value={formData.Age}
            onChange={handleChange}
            className="input-field"
            required
          />

          <div className="input-row">
            <input
              type="number"
              name="Height_Feet"
              placeholder="Height (ft)"
              value={formData.Height_Feet}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              type="number"
              name="Height_Inches"
              placeholder="Height (in)"
              value={formData.Height_Inches}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <input
            type="number"
            name="Weight"
            placeholder="Weight (kg)"
            value={formData.Weight}
            onChange={handleChange}
            className="input-field"
            required
          />

          <input
            type="text"
            name="BMI"
            placeholder="BMI (auto-calculated)"
            value={formData.BMI}
            onChange={handleChange}
            readOnly
            className="input-field read-only"
          />

          {/* Dropdown Fields */}
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

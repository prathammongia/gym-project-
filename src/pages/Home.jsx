import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Home.css";
import logo from "../assets/logo.png";
 // <-- relative import (src/assets/logo.png)

function Home() {
  return (
    <div className="home-page">
      {/* === LOGO (Top Right Corner) === */}
      <motion.div
        className="logo-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Link to="/" aria-label="Home">
          <img src={logo} alt="Gym Jam Logo" className="logo-image" />
        </Link>
      </motion.div>

      {/* === HERO SECTION === */}
      <motion.div
        className="hero-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="hero-title">GYM JAM</h1>
        <p className="hero-tagline">
          Your personalized fitness and nutrition partner. <br />
          Track progress, predict calories, and achieve your goals smarter.
        </p>

        <div className="hero-buttons">
          <Link to="/check-in" className="btn btn-primary">
            💪 Check In
          </Link>
          <Link to="/diet-recommend" className="btn btn-secondary">
            🥗 Diet Plans
          </Link>
          <Link to="/calories" className="btn btn-tertiary">
            🔥 Calorie Tracker
          </Link>
        </div>
      </motion.div>

      {/* === MOTIVATION BANNER === */}
      <motion.div
        className="motivation-banner"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <h2>
          <p>Plan Your Pump</p>
          “Discipline beats motivation. <span>Show up. Every day.</span>”
        </h2>
      </motion.div>

      {/* === PROJECT CREDIT SECTION === */}
      <motion.div
        className="credit-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <div className="credit-box">
          <h3>Made by</h3>
          <h2>Pratham Mongia &amp; Santript Mishra</h2>
          <p>
            Under the guidance of <strong>Dr. Archana T</strong>
          </p>
          <p>Designation: Assistant Professor (Sr. Grade 1)</p>
        </div>
      </motion.div>

      
    </div>
  );
}

export default Home;

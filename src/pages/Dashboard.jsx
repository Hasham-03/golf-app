import { useState, useEffect } from "react";

export default function Dashboard() {
  const [score, setScore] = useState("");
  const [date, setDate] = useState("");
  const [scores, setScores] = useState([]);
  const [charity, setCharity] = useState("");
  const [plan, setPlan] = useState("");

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem("scores")) || [];
    const savedCharity = localStorage.getItem("charity") || "";
    const savedPlan = localStorage.getItem("plan") || "";

    setScores(savedScores);
    setCharity(savedCharity);
    setPlan(savedPlan);
  }, []);

  const addScore = () => {
    if (!score || !date) {
      alert("Enter score and date");
      return;
    }

    if (!charity) {
      alert("Select charity");
      return;
    }

    if (score < 1 || score > 45) {
      alert("Score must be between 1 and 45");
      return;
    }

    let updated = [...scores];

    if (updated.length >= 5) updated.shift();

    updated.push({
      value: Number(score),
      date: date,
    });

    updated.sort((a, b) => new Date(b.date) - new Date(a.date));

    localStorage.setItem("scores", JSON.stringify(updated));
    localStorage.setItem("charity", charity);

    setScores(updated);
    setScore("");
    setDate("");
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={container}>
      {/* 🔴 Logout */}
      <button onClick={logout} style={logoutBtn}>
        Logout
      </button>

      {/* 🟦 Card */}
      <div style={card}>
        <h1 style={title}>Dashboard</h1>

        <h3 style={subtitle}>
          Plan: <span style={{ color: "#667eea" }}>{plan || "None"}</span>
        </h3>

        <h4 style={subtitle}>
          Charity: <span style={{ color: "#764ba2" }}>{charity || "None"}</span>
        </h4>

        {/* Inputs */}
        <input
          type="number"
          placeholder="Score (1-45)"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          style={input}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={input}
        />

        <select
          value={charity}
          onChange={(e) => setCharity(e.target.value)}
          style={input}
        >
          <option value="">Select Charity</option>
          <option value="Education Fund">Education Fund</option>
          <option value="Health Support">Health Support</option>
          <option value="Child Care">Child Care</option>
        </select>

        {/* Button */}
        <button
          onClick={addScore}
          style={button}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.03)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Add Score
        </button>

        <h2 style={{ marginTop: "20px" }}>Last 5 Scores</h2>

        {scores.length === 0 ? (
          <p>No scores yet</p>
        ) : (
          scores.map((s, i) => (
            <div key={i} style={scoreBox}>
              👉 {s.value} | 📅 {s.date}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  height: "100vh",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};

const card = {
  background: "rgba(255,255,255,0.95)",
  padding: "40px",
  borderRadius: "16px",
  width: "360px",
  textAlign: "center",
  boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
  backdropFilter: "blur(10px)",
};

const title = {
  fontSize: "42px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const subtitle = {
  color: "#555",
  marginBottom: "10px",
};

const input = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none",
};

const button = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0 4px 12px rgba(102,126,234,0.4)",
  transition: "0.3s",
};

const logoutBtn = {
  position: "absolute",
  top: "20px",
  right: "20px",
  background: "#ff4d4f",
  color: "white",
  padding: "10px 14px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const scoreBox = {
  background: "#f8f9ff",
  padding: "10px",
  margin: "6px 0",
  borderRadius: "8px",
  borderLeft: "4px solid #667eea",
};

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    const userData = { email, password };
    localStorage.setItem("user", JSON.stringify(userData));

    alert("Signup successful ✅");
    navigate("/");
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>Signup</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button onClick={handleSignup} style={button}>
          Signup
        </button>

        <p>
          <Link to="/" style={link}>
            Already have account? Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const container = {
  height: "100vh",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  background: "#fff",
  padding: "40px",
  borderRadius: "12px",
  width: "320px",
  textAlign: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const button = {
  width: "100%",
  padding: "10px",
  background: "#667eea",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

const link = {
  color: "#667eea",
  textDecoration: "none",
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    const existingUser = users[normalizedEmail];

    if (existingUser && existingUser.password !== password) {
      alert("Invalid email or password");
      return;
    }

    if (!existingUser) {
      users[normalizedEmail] = { email: normalizedEmail, password };
      localStorage.setItem("users", JSON.stringify(users));
    }

    localStorage.setItem("currentUserEmail", normalizedEmail);

    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    if (!userData[normalizedEmail]) {
      userData[normalizedEmail] = {
        subscribed: false,
        plan: "",
        charity: "",
        scores: [],
      };
      localStorage.setItem("userData", JSON.stringify(userData));
    }

    if (userData[normalizedEmail].subscribed) {
      navigate("/dashboard");
      return;
    }

    navigate("/subscription");
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>Login</h2>

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

        <button onClick={handleLogin} style={button}>
          Login
        </button>
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

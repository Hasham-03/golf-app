import { useNavigate } from "react-router-dom";

export default function Subscription() {
  const navigate = useNavigate();

  const subscribe = (plan) => {
    const currentUserEmail = localStorage.getItem("currentUserEmail");
    if (!currentUserEmail) {
      navigate("/");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const currentUserData = userData[currentUserEmail] || {
      subscribed: false,
      plan: "",
      charity: "",
      scores: [],
    };

    userData[currentUserEmail] = {
      ...currentUserData,
      plan,
      subscribed: true,
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    navigate("/dashboard");

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ marginBottom: "20px" }}>
          Choose Subscription
        </h2>

        <button
          onClick={() => subscribe("Monthly")}
          style={{ ...button, background: "#28a745" }}
        >
          Monthly Plan
        </button>

        <button
          onClick={() => subscribe("Yearly")}
          style={{ ...button, background: "#007bff" }}
        >
          Yearly Plan
        </button>
      </div>
    </div>
  );
}

/* 🎨 UI */

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

const button = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
};

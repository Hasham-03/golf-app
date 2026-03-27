import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Subscription from "./pages/Subscription";
import { useState, useEffect } from "react";

function App() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const currentUserEmail = localStorage.getItem("currentUserEmail");
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const check =
      !!currentUserEmail &&
      !!userData[currentUserEmail] &&
      userData[currentUserEmail].subscribed === true;
    setIsSubscribed(check);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/subscription" element={<Subscription />} />

        {/* ✅ Protected Dashboard */}
        <Route
          path="/dashboard"
          element={isSubscribed ? <Dashboard /> : <Subscription />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

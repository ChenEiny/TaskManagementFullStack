import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CognitoCallback() {
  const navigate = useNavigate();
  const hasRun = useRef(false); // Prevent double submission in StrictMode

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) {
      alert("Login failed: no code received");
      navigate("/");
      return;
    }

    fetch("http://localhost:8000/api/callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ code }),
    })
      .then(async (res) => {
        if (!res.ok) {
          // Try to get plain error message if not JSON
          const msg = await res.text();
          throw new Error(msg || "Failed to authenticate");
        }
        return res.json();
      })
      .then(() => {
        navigate("/Home");
      })
      .catch((err) => {
        alert("Login failed: " + err.message);
        navigate("/");
      });
  }, [navigate]);

  return <div>Logging you in...</div>;
}

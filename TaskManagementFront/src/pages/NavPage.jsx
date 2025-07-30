import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function NavPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Navigate on mount
    navigate("/projects/0");

    // 2. Fetch user info ONCE on mount
    fetch("http://localhost:8000/api/user/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => {
        // Defensive logging based on available fields
        console.log("API response:", data);
        if (data.email) {
          console.log("Logged in as:", data.email);
        } else if (data.username) {
          console.log("Logged in as:", data.username);
        } else {
          console.log("Logged in as: unknown user", data);
        }
      })
      .catch((err) => {
        console.warn("Not logged in:", err.message);
      });

  }, [navigate]);

  return null;
}

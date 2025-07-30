// Login.jsx
import React from "react";

const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
const domain = import.meta.env.VITE_COGNITO_DOMAIN;
const redirectUri = import.meta.env.VITE_COGNITO_REDIRECT_URI;// or your deployed app's URI

export default function Login() {
  const handleLogin = () => {
    const loginUrl = `${domain}/login?client_id=${clientId}&response_type=code&scope=openid+email&redirect_uri=${encodeURIComponent(
      redirectUri
    )}`;
    window.location.href = loginUrl;
  };

  return (
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      onClick={handleLogin}
    >
      Login with Cognito
    </button>
  );
}

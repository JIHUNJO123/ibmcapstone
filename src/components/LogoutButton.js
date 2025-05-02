// src/components/LogoutButton.js
import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton({ onLogout }) {
  const navigate = useNavigate();

  const handleClick = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("role");

    navigate("/login");
    onLogout(); // Call the prop function
  };

  return <button onClick={handleClick}>Logout</button>;
}

export default LogoutButton;

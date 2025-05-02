import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpForm.css";

const API_URL = "http://localhost:8181"; // Replace with your backend URL

function SignUpForm() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role, name, email, password }),
      });

      const json = await response.json();

      if (json.authtoken) {
        // Successful signup
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("role", role);
        navigate("/"); // Redirect to home page
        window.location.reload();
      } else {
        // Signup failed
        setError(json.error || "Signup failed");
      }
    } catch (error) {
      setError("An error occurred during signup");
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Display error message */}
    </div>
  );
}

export default SignUpForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import "./SignUpForm.css";

function SignUpForm() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  console.log("API URL is:", API_URL); // API URL 확인용 디버깅

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // 입력값 검증
    if (!role || !name || !email || !password) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    try {
      console.log("Submitting form with:", { role, name, email, password: "***" });

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role, name, email, password }),
      });

      console.log("Response status:", response.status);
      const json = await response.json();
      console.log("Response data:", json);

      if (json.success && json.authtoken) {
        // Successful signup
        console.log("회원가입 성공!");
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("role", role);
        navigate("/"); // Redirect to home page
        window.location.reload();
      } else {
        // Signup failed
        console.log("회원가입 실패:", json);
        setError(json.error || "Signup failed");
      }
    } catch (error) {
      console.error("회원가입 중 에러 발생:", error);
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
            required
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default SignUpForm;

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { AuthContext } from "../AuthContext";

export const API_URL = "http://localhost:8181";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", json.name);
        sessionStorage.setItem("role", json.role);
        sessionStorage.setItem("email", email); // Add this line!

        setLoading(false);
        navigate("/");
        handleLogin();
      } else {
        setError(json.error || "Login failed");
        setLoading(false);
      }
    } catch (error) {
      setError("An error occurred during login");
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <p>
        Are you a new member? <Link to="/signup">Sign Up Here</Link>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="button-group">
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <button type="reset" className="reset-button">
            Reset
          </button>
        </div>
      </form>
      <p>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </div>
  );
}

export default LoginForm;

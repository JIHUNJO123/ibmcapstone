import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      setLoading(false);
      return;
    }

    try {
      console.log("Sending login request for:", email);
      
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Login response status:", response.status);
      
      const json = await response.json();
      console.log("Login response:", json);

      if (json.authtoken) {
        // 로그인 성공
        console.log("Login successful");
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", json.name);
        sessionStorage.setItem("email", json.email);
        sessionStorage.setItem("role", json.role);
        navigate("/");
        window.location.reload();
      } else {
        // 로그인 실패
        console.error("Login failed:", json.error);
        setError(json.error || "이메일 또는 비밀번호가 올바르지 않습니다.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("서버 연결에 실패했습니다. 서버가 실행 중인지 확인해주세요.");
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "로그인 중..." : "Login"}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default LoginForm;

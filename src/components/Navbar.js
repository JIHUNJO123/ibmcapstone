// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import DropdownMenu from "./DropdownMenu";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 상태 체크
    const token = sessionStorage.getItem("auth-token");
    const name = sessionStorage.getItem("name");
    const email = sessionStorage.getItem("email");
    const role = sessionStorage.getItem("role");
    
    if (token) {
      setIsLoggedIn(true);
      setUserName(name || "User");
      setUserEmail(email || "");
      setUserRole(role || "User");
    }
  }, []);

  const handleLogout = () => {
    // 로그아웃 처리
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Healthy Lives
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/appointments" className="nav-link">
              Appointments
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/reviews" className="nav-link">
              Reviews
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/reports" className="nav-link">
              Reports
            </Link>
          </li>
          
          {!isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item nav-user">
              <DropdownMenu 
                userName={userName} 
                userEmail={userEmail} 
                userRole={userRole} 
                onLogout={handleLogout}
              />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

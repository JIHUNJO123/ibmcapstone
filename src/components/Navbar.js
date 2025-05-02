// src/components/Navbar.js
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { AuthContext } from "../AuthContext";
import "./Navbar.css"; // Import Navbar.css

function Navbar() {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("User"); // Default to "User" if no email

  useEffect(() => {
    if (isLoggedIn) {
      const email = sessionStorage.getItem("email");
      if (email) {
        setUserName(email);
      }
    }
  }, [isLoggedIn]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">StayHealthy</div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/appointments">Appointments</Link>
        </li>
        <li>
          <a href="#">Health Blog</a>
        </li>
        <li>
          <Link to="/reviews">Reviews</Link>
        </li>
      </ul>
      <div className="nav-buttons">
        {isLoggedIn ? (
          <div className="user-dropdown">
            <button className="user-trigger" onClick={toggleDropdown}>
              {userName}
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/profile">Your Profile</Link>
                </li>
                <li>
                  <Link to="/reports">Your Reports</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <>
            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
            <Link to="/login" className="login-btn">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

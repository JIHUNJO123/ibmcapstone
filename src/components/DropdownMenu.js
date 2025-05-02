import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DropdownMenu.css";

function DropdownMenu({ userName, userEmail, userRole, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // 드롭다운 외부를 클릭했을 때 닫히도록
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div className="dropdown-trigger" onClick={toggleDropdown}>
        <div className="user-avatar">
          <img 
            src={`https://ui-avatars.com/api/?name=${userName}&background=random`}
            alt="User Avatar"
          />
        </div>
        <span className="user-name">{userName}</span>
        <i className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</i>
      </div>
      
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <strong>{userName}</strong>
            <p>{userEmail}</p>
            <span className="role-tag">{userRole}</span>
          </div>
          <div className="dropdown-divider"></div>
          <ul className="dropdown-items">
            <li>
              <Link to="/profile">내 프로필</Link>
            </li>
            <li>
              <Link to="/settings">설정</Link>
            </li>
            <li>
              <Link to="/appointments">내 예약</Link>
            </li>
            <li className="dropdown-divider"></li>
            <li className="logout-item">
              <button onClick={onLogout}>로그아웃</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
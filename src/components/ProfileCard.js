import React from "react";
import "./ProfileCard.css";

function ProfileCard({ userName, userEmail, userRole }) {
  return (
    <div className="profile-card">
      <div className="profile-card-avatar">
        <img 
          src={`https://ui-avatars.com/api/?name=${userName}&background=random`} 
          alt="Profile Avatar" 
        />
      </div>
      <div className="profile-card-info">
        <h3>{userName}</h3>
        <p>{userEmail}</p>
        <span className="role-badge">{userRole}</span>
      </div>
    </div>
  );
}

export default ProfileCard;
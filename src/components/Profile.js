// src/components/Profile.js (or any component that displays user info)
import React, { useState, useEffect } from "react";

function Profile() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState(""); // Add userRole state

  useEffect(() => {
    // Retrieve user data from Session Storage
    const name = sessionStorage.getItem("name");
    const email = sessionStorage.getItem("email");
    const role = sessionStorage.getItem("role");

    console.log("User Name from sessionStorage:", name);
    console.log("User Email from sessionStorage:", email);
    console.log("User Role from sessionStorage:", role); // Log the role

    if (name && email && role) {
      // check if role is present
      setUserName(name);
      setUserEmail(email);
      setUserRole(role); // Set userRole state
    }
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userName}</p>
      <p>Email: {userEmail}</p>
      <p>Role: {userRole}</p>
    </div>
  );
}

export default Profile;

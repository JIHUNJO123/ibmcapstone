// src/components/ProfileCard/ProfileCard.js
import React, { useEffect, useState, useRef, memo, useCallback } from "react";
import { API_URL } from "../LoginForm";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.css";

const ProfileCard = memo(() => {
  console.log("ProfileCard component rendered");

  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  const navigate = useNavigate();
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const isMounted = useRef(false);

  const fetchUserProfile = useCallback(async () => {
    // useCallback added here
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      console.log("authToken:", authtoken);
      console.log("email:", email);

      if (!authtoken) {
        navigate("/login");
      } else {
        const response = await fetch(`${API_URL}/api/auth/user`, {
          headers: {
            Authorization: `Bearer ${authtoken}`,
            Email: email,
          },
        });
        console.log("API Response:", response);
        if (response.ok) {
          const user = await response.json();
          console.log("User Details:", user);
          setUserDetails(user);
          setUpdatedDetails(user);
          setIsProfileLoaded(true);
        } else {
          console.error("API Error:", response);
          throw new Error("Failed to fetch user profile");
        }
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  }, [navigate]);

  useEffect(() => {
    if (isMounted.current) {
      const authtoken = sessionStorage.getItem("auth-token");
      if (!authtoken) {
        navigate("/login");
      } else {
        fetchUserProfile();
      }
    } else {
      isMounted.current = true;
    }
  }, [navigate, fetchUserProfile]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken || !email) {
        navigate("/login");
        return;
      }

      const payload = { ...updatedDetails };
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          Email: email,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);

        setUserDetails(updatedDetails);
        setEditMode(false);
        setSaveMessage("Saved!");
        setTimeout(() => setSaveMessage(null), 3000);
        setIsProfileLoaded(true);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-container">
      {saveMessage && <p className="save-message">{saveMessage}</p>}
      {isProfileLoaded && (
        <>
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={updatedDetails.email}
                  disabled
                />
              </label>
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  value={updatedDetails.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Phone
                <input
                  type="text"
                  name="phone"
                  value={updatedDetails.phone}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit">Save</button>
            </form>
          ) : (
            <div className="profile-details">
              <h1>Welcome, {userDetails.name}</h1>
              <p>
                <b>Email:</b> {userDetails.email}
              </p>
              <p>
                <b>Phone:</b> {userDetails.phone}
              </p>
              <button onClick={handleEdit}>Edit</button>
            </div>
          )}
        </>
      )}
    </div>
  );
});

export default ProfileCard;

// src/components/Notification/Notification.js
import React, { useState, useEffect } from "react";
import "./Notification.css";

const Notification = ({ children, appointmentData, onCancelAppointment }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showNotification, setShowNotification] = useState(!!appointmentData);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("email");

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleCancel = () => {
    setShowNotification(false);
    if (onCancelAppointment) {
      onCancelAppointment();
    }
  };

  return (
    <div>
      {children}
      {isLoggedIn && appointmentData && showNotification && (
        <div className="notification-container">
          <div className="notification-card">
            <h3 className="notification-title">Appointment Details</h3>
            <p className="notification-message">
              <strong>Doctor:</strong> {appointmentData.doctorName}
            </p>
            <p className="notification-message">
              <strong>Patient:</strong> {username}
            </p>
            <p className="notification-message">
              <strong>Date:</strong> {appointmentData.date}
            </p>
            <p className="notification-message">
              <strong>Time:</strong> {appointmentData.time}
            </p>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;

// src/components/SearchDoctor.js
import React from "react";
import "./Appointment.css";

function SearchDoctor() {
  return (
    <div className="search-doctor">
      <h2>Find a doctor at your own ease</h2>
      <input type="text" placeholder="Search doctors by specialty" />
      <p>8 doctors available in </p>
    </div>
  );
}

export default SearchDoctor;

import React, { useState } from "react";
import "./SimpleInstantConsultation.css";

function SimpleInstantConsultation() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [appointment, setAppointment] = useState(null);

  const handleStartConsultation = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const appointmentData = { name, phoneNumber, date, time };
    setAppointment(appointmentData);

    localStorage.setItem("appointment", JSON.stringify(appointmentData)); // Save to localStorage
    setShowForm(false);
  };

  const handleCancelAppointment = () => {
    setAppointment(null);
    localStorage.removeItem("appointment"); // Remove from localStorage
  };

  return (
    <div className="simple-consultation-container">
      <h2>Instant Consultation</h2>
      <p>Doctor: Dr. Example Name</p>
      <p>Specialty: Example Specialty</p>

      {!showForm && !appointment && (
        <button onClick={handleStartConsultation}>Start Consultation</button>
      )}

      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="time"
            placeholder="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <button type="submit">Book Now</button>
        </form>
      )}

      {appointment && (
        <div className="appointment-details">
          <h3>Appointment Booked!</h3>
          <p>Name: {appointment.name}</p>
          <p>Phone: {appointment.phoneNumber}</p>
          <p>Date: {appointment.date}</p>
          <p>Time: {appointment.time}</p>
          <button onClick={handleCancelAppointment}>Cancel Appointment</button>
        </div>
      )}
    </div>
  );
}

export default SimpleInstantConsultation;

// src/components/DoctorCard.js
import React, { useState } from "react";
import Modal from "react-modal";
import "./Appointment.css";

Modal.setAppElement("#root");

function DoctorCard({ name, specialty, experience, rating, onBook }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleBook = () => {
    const appointmentData = {
      doctorName: name,
      specialty: specialty,
      date: date,
      time: time,
      phoneNumber: phoneNumber,
    };

    localStorage.setItem(name, JSON.stringify(appointmentData));
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleCancelAppointment = () => {
    localStorage.removeItem(name);
    setModalIsOpen(false);
  };

  return (
    <div className="doctor-card">
      <h3>{name}</h3>
      <p>{specialty}</p>
      <p>{experience} years experience</p>
      <p>Rating: {rating}</p>
      <label>Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <label>Time:</label>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <label>Phone Number:</label>
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleBook}>Book Appointment</button>
      <p>No Booking Fee</p>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Appointment Details"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-content">
          <h3>Appointment Booked!</h3>
          <p>Doctor: {name}</p>
          <p>Specialty: {specialty}</p>
          <p>Date: {date}</p>
          <p>Time: {time}</p>
          <p>Phone Number: {phoneNumber}</p>
          <button onClick={handleCancelAppointment}>Cancel Appointment</button>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
}

export default DoctorCard;

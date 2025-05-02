// src/components/InstantBooking.js
import React, { useState } from "react";
import Modal from "react-modal";
import "./InstantBooking.css";

Modal.setAppElement("#root"); // Important for accessibility

function InstantBooking({ name, specialty, experience, rating }) {
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal state

  const handleBookNow = (e) => {
    e.preventDefault();

    const appointmentData = {
      doctorName: name,
      specialty: specialty,
      experience: experience,
      rating: rating,
      userName: userName,
      phoneNumber: phoneNumber,
      date: date,
      time: time,
    };

    localStorage.setItem(name, JSON.stringify(appointmentData));
    setIsBooked(true);
    setModalIsOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleCancelAppointment = () => {
    setIsBooked(false);
    setUserName("");
    setPhoneNumber("");
    setDate("");
    setTime("");
    localStorage.removeItem(name);
    setModalIsOpen(false);
  };

  return (
    <div className="instant-booking-card">
      {/* ... (rest of your component) */}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Appointment Details"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-content">
          <h3>Appointment Booked!</h3>
          <p>Name: {userName}</p>
          <p>Phone Number: {phoneNumber}</p>
          <p>Date: {date}</p>
          <p>Time: {time}</p>
          <button onClick={handleCancelAppointment}>Cancel Appointment</button>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
}

export default InstantBooking;

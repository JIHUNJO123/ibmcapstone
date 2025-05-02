// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import AppointmentBooking from "./components/AppointmentBooking";
import Reviews from "./components/ReviewForm/Reviews";
import { AuthProvider } from "./AuthContext";
import Notification from "./components/Notification/Notification";
import ProfileCard from "./components/ProfileCard/ProfileCard"; // Import ProfileCard
import ReportsLayout from "./components/ReportsLayout/ReportsLayout"; // Import ReportsLayout

function App() {
  const [appointment, setAppointment] = useState(null);

  const handleBookAppointment = (appointmentData) => {
    setAppointment(appointmentData);
  };

  const handleCancelAppointment = () => {
    setAppointment(null);
    localStorage.removeItem("appointment");
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Notification
            appointmentData={appointment}
            onCancelAppointment={handleCancelAppointment}
          >
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/appointments"
                element={
                  <AppointmentBooking
                    onBookAppointment={handleBookAppointment}
                  />
                }
              />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/reports" element={<ReportsLayout />} />
              <Route path="/profile" element={<ProfileCard />} />
            </Routes>
          </Notification>
        </div>
        {console.log("App.js Rendered")}
      </Router>
    </AuthProvider>
  );
}

export default App;

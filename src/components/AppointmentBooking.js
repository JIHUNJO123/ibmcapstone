// src/components/AppointmentBooking.js
import React, { useState } from "react";
import SearchDoctor from "./SearchDoctor";
import DoctorCard from "./DoctorCard";
import SimpleInstantConsultation from "./SimpleInstantConsultation";
import InstantBooking from "./InstantBooking";
import "./Appointment.css";

function AppointmentBooking() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleBook = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div className="appointment-booking">
      <SearchDoctor />
      <div className="doctor-cards-container">
        {" "}
        {/* Add the container here */}
        <DoctorCard
          name="Dr. Jiao Yang"
          specialty="Dentist"
          experience="6"
          rating="*****"
          onBook={() =>
            handleBook({
              name: "Dr. Jiao Yang",
              specialty: "Dentist",
              experience: "6",
              rating: "*****",
            })
          }
        />
        <DoctorCard
          name="Dr. Denis Raj"
          specialty="Dentist"
          experience="24"
          rating="****"
          onBook={() =>
            handleBook({
              name: "Dr. Denis Raj",
              specialty: "Dentist",
              experience: "24",
              rating: "****",
            })
          }
        />
        <DoctorCard
          name="Dr. Lyn Christie"
          specialty="Dentist"
          experience="11"
          rating="****"
          onBook={() =>
            handleBook({
              name: "Dr. Lyn Christie",
              specialty: "Dentist",
              experience: "11",
              rating: "****",
            })
          }
        />
      </div>
      <SimpleInstantConsultation />
      {selectedDoctor && <InstantBooking {...selectedDoctor} />}
    </div>
  );
}

export default AppointmentBooking;

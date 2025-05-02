// src/components/AppointmentBooking.js
import React, { useState, useEffect } from "react";
import "./AppointmentBooking.css";
import AppointmentNotification from "./AppointmentNotification";

function AppointmentBooking() {
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Smith", speciality: "Cardiology" },
    { id: 2, name: "Dr. Johnson", speciality: "Neurology" },
    { id: 3, name: "Dr. Williams", speciality: "Orthopedics" },
    { id: 4, name: "Dr. Brown", speciality: "Dermatology" },
    { id: 5, name: "Dr. Davis", speciality: "Pediatrics" },
    { id: 6, name: "Dr. Miller", speciality: "Ophthalmology" },
  ]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [bookingMode, setBookingMode] = useState("standard"); // "standard" or "instant"
  const [availableSlots, setAvailableSlots] = useState([]);

  // 검색어가 변경될 때마다 의사 목록 필터링
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredDoctors(doctors);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = doctors.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(query) ||
          doctor.speciality.toLowerCase().includes(query)
      );
      setFilteredDoctors(filtered);
    }
  }, [searchQuery, doctors]);

  // 컴포넌트 마운트 시 모든 의사 목록 표시
  useEffect(() => {
    setFilteredDoctors(doctors);
  }, []);

  // 예시 예약 데이터 로드 (실제로는 API에서 가져올 것)
  useEffect(() => {
    // 예시 데이터 - 실제로는 API에서 불러오기
    const sampleAppointments = [
      {
        id: 1,
        doctorName: "Dr. Smith",
        doctorSpeciality: "Cardiology",
        date: "2025-05-10",
        time: "10:30",
        reason: "Regular checkup"
      },
      {
        id: 2,
        doctorName: "Dr. Johnson",
        doctorSpeciality: "Neurology",
        date: "2025-05-15",
        time: "14:00",
        reason: "Headache consultation"
      }
    ];
    setAppointments(sampleAppointments);
  }, []);

  // 즉시 예약 가능한 시간대 로드 (실제로는 API에서 가져올 것)
  useEffect(() => {
    // 현재 시간 기준으로 다음 며칠간 사용 가능한 시간대를 생성
    const generateAvailableSlots = () => {
      const slots = [];
      const today = new Date();
      
      // 오늘부터 7일간의 시간대 생성
      for (let i = 0; i < 7; i++) {
        const slotDate = new Date(today);
        slotDate.setDate(today.getDate() + i);
        
        // 각 날짜에 대해 두 개의 시간대 생성 (오전/오후)
        const morningSlot = {
          id: slots.length + 1,
          date: slotDate.toISOString().split('T')[0],
          time: "10:00",
          doctorId: Math.floor(Math.random() * doctors.length) + 1, // 랜덤 의사
          available: Math.random() > 0.3 // 70%는 가용, 30%는 불가능
        };
        
        const afternoonSlot = {
          id: slots.length + 2,
          date: slotDate.toISOString().split('T')[0],
          time: "14:00",
          doctorId: Math.floor(Math.random() * doctors.length) + 1, // 랜덤 의사
          available: Math.random() > 0.3 // 70%는 가용, 30%는 불가능
        };
        
        slots.push(morningSlot, afternoonSlot);
      }
      
      return slots.filter(slot => slot.available);
    };
    
    setAvailableSlots(generateAvailableSlots());
  }, [doctors]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form
    if (!selectedDoctor || !date || !time) {
      setMessage("Please select a doctor, date, and time");
      return;
    }

    // 새 예약 생성
    const newAppointment = {
      id: appointments.length + 1,
      doctorName: selectedDoctor.name,
      doctorSpeciality: selectedDoctor.speciality,
      date: date,
      time: time,
      reason: reason || "Not specified"
    };

    // 예약 목록에 추가
    setAppointments([...appointments, newAppointment]);

    // Here you would typically make an API call to book the appointment
    setMessage(
      `Appointment booked with ${selectedDoctor.name} on ${date} at ${time}!`
    );

    // 새 예약이 생성되면 알림 표시
    setShowNotifications(true);

    // Reset form
    setSelectedDoctor(null);
    setDate("");
    setTime("");
    setReason("");
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleBookingModeChange = (mode) => {
    setBookingMode(mode);
  };

  const handleInstantBook = (slot) => {
    // 선택한 슬롯에 해당하는 의사 찾기
    const doctor = doctors.find(doc => doc.id === slot.doctorId);
    
    if (!doctor) {
      setMessage("해당 의사를 찾을 수 없습니다.");
      return;
    }
    
    // 새 예약 생성
    const newAppointment = {
      id: appointments.length + 1,
      doctorName: doctor.name,
      doctorSpeciality: doctor.speciality,
      date: slot.date,
      time: slot.time,
      reason: reason || "Instant booking"
    };

    // 예약 목록에 추가
    setAppointments([...appointments, newAppointment]);
    
    // 성공 메시지 표시
    setMessage(
      `Instant appointment booked with ${doctor.name} on ${slot.date} at ${slot.time}!`
    );
    
    // 예약 성공 시 알림 표시
    setShowNotifications(true);
    
    // 폼 초기화
    setSelectedDoctor(null);
    setReason("");
    
    // 사용된 슬롯 제거
    setAvailableSlots(availableSlots.filter(s => s.id !== slot.id));
  };

  return (
    <div className="appointment-booking">
      <h2>Book an Appointment</h2>
      
      {/* 알림 버튼 추가 */}
      <button 
        className="notification-toggle" 
        onClick={toggleNotifications}
      >
        <span className="notification-icon">🔔</span>
        {appointments.length > 0 && (
          <span className="notification-badge">{appointments.length}</span>
        )}
      </button>
      
      {/* 알림 컴포넌트 */}
      {showNotifications && (
        <AppointmentNotification 
          appointments={appointments}
          onClose={() => setShowNotifications(false)}
        />
      )}
      
      {/* 예약 모드 선택 */}
      <div className="booking-mode-selector">
        <button 
          className={`mode-btn ${bookingMode === 'standard' ? 'active' : ''}`}
          onClick={() => handleBookingModeChange('standard')}
        >
          Standard Booking
        </button>
        <button 
          className={`mode-btn ${bookingMode === 'instant' ? 'active' : ''}`}
          onClick={() => handleBookingModeChange('instant')}
        >
          Instant Booking
        </button>
      </div>
      
      {bookingMode === 'instant' ? (
        /* 즉시 예약 UI */
        <div className="instant-booking-container">
          <h3>Available Time Slots</h3>
          {availableSlots.length === 0 ? (
            <p>No available slots found. Please try standard booking.</p>
          ) : (
            <div className="available-slots">
              {availableSlots.map(slot => {
                const slotDoctor = doctors.find(d => d.id === slot.doctorId);
                return (
                  <div key={slot.id} className="slot-card">
                    <div className="slot-info">
                      <div className="slot-date">{slot.date} at {slot.time}</div>
                      <div className="slot-doctor">
                        {slotDoctor?.name} ({slotDoctor?.speciality})
                      </div>
                    </div>
                    <div className="form-group instant-reason">
                      <textarea
                        placeholder="Reason for visit (optional)"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows="2"
                      ></textarea>
                      <button
                        className="book-now-btn"
                        onClick={() => handleInstantBook(slot)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* 기존 표준 예약 UI */
        <>
          {/* 의사 검색 기능 추가 */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search doctors by name or speciality..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
          </div>

          <div className="doctors-list">
            <h3>Select a Doctor</h3>
            {filteredDoctors.length === 0 ? (
              <p>No doctors found matching your search</p>
            ) : (
              filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className={`doctor-card ${
                    selectedDoctor && selectedDoctor.id === doctor.id ? "selected" : ""
                  }`}
                  onClick={() => handleDoctorSelect(doctor)}
                >
                  <h4>{doctor.name}</h4>
                  <p>{doctor.speciality}</p>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Selected Doctor:</label>
              <div className="selected-doctor">
                {selectedDoctor ? (
                  <span>
                    {selectedDoctor.name} ({selectedDoctor.speciality})
                  </span>
                ) : (
                  <span className="no-selection">No doctor selected</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time:</label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reason">Reason for Visit:</label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="4"
              ></textarea>
            </div>

            <button type="submit">Book Appointment</button>
          </form>
        </>
      )}

      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default AppointmentBooking;

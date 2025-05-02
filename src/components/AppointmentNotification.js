import React from 'react';
import './AppointmentNotification.css';

function AppointmentNotification({ appointments, onClose }) {
  // 오늘 날짜 가져오기
  const today = new Date();
  
  // 임박한 예약 (7일 이내) 필터링
  const upcomingAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    const diffTime = appointmentDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;  // 오늘부터 7일 이내
  });

  // 날짜 포맷팅 함수 - 영어로 변경
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="appointment-notifications">
      <div className="notification-header">
        <h3>Appointment Notifications</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      {appointments.length === 0 ? (
        <p className="no-appointments">No scheduled appointments.</p>
      ) : (
        <>
          {upcomingAppointments.length > 0 && (
            <div className="upcoming-section">
              <h4>Upcoming Appointments</h4>
              {upcomingAppointments.map(appointment => (
                <div key={appointment.id} className="notification-item upcoming">
                  <div className="notification-date">
                    {formatDate(appointment.date)} {appointment.time}
                  </div>
                  <div className="notification-doctor">
                    {appointment.doctorName} ({appointment.doctorSpeciality})
                  </div>
                  <div className="notification-reason">
                    <strong>Reason:</strong> {appointment.reason}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="all-appointments-section">
            <h4>All Appointments</h4>
            {appointments.map(appointment => (
              <div key={appointment.id} className="notification-item">
                <div className="notification-date">
                  {formatDate(appointment.date)} {appointment.time}
                </div>
                <div className="notification-doctor">
                  {appointment.doctorName} ({appointment.doctorSpeciality})
                </div>
                <div className="notification-reason">
                  <strong>Reason:</strong> {appointment.reason}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AppointmentNotification;
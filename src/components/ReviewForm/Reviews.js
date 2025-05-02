// src/components/Reviews.js
import React, { useState } from "react";
import ReviewForm from "../ReviewForm/ReviewForm";
import "../ReviewForm/Reviews.css";

function Reviews() {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. John Doe",
      specialty: "Cardiology",
      reviewGiven: false,
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      specialty: "Dermatology",
      reviewGiven: true,
    },
  ]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [submittedReviews, setSubmittedReviews] = useState({});
  const [editingReviewId, setEditingReviewId] = useState(null);

  const handleGiveReview = (doctorId) => {
    setSelectedDoctorId(doctorId);
  };

  const handleReviewSubmit = (doctorId, reviewData) => {
    setDoctors(
      doctors.map((doctor) =>
        doctor.id === doctorId ? { ...doctor, reviewGiven: true } : doctor
      )
    );
    setSelectedDoctorId(null);
    setSubmittedReviews({
      ...submittedReviews,
      [doctorId]: reviewData,
    });
  };

  const handleEditReview = (doctorId) => {
    setEditingReviewId(doctorId);
  };

  const handleUpdateReview = (doctorId, updatedReviewData) => {
    setSubmittedReviews({
      ...submittedReviews,
      [doctorId]: updatedReviewData,
    });
    setEditingReviewId(null);
  };

  return (
    <div className="reviews-section">
      <h2>Reviews</h2>
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Doctor Name</th>
            <th>Doctor Specialty</th>
            <th>Provide Review</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.specialty}</td>
              <td>
                <button
                  onClick={() => handleGiveReview(doctor.id)}
                  disabled={doctor.reviewGiven}
                >
                  {doctor.reviewGiven ? "Reviewed" : "Give Review"}
                </button>
              </td>
              <td>{doctor.reviewGiven ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedDoctorId && (
        <ReviewForm doctorId={selectedDoctorId} onSubmit={handleReviewSubmit} />
      )}
      {Object.keys(submittedReviews).length > 0 && (
        <div className="submitted-reviews">
          <h3>Submitted Reviews:</h3>
          {Object.entries(submittedReviews).map(([doctorId, review]) => (
            <div key={doctorId}>
              <h4>
                Doctor{" "}
                {doctors.find((doctor) => doctor.id === Number(doctorId)).name}
              </h4>
              <p>Patient Name: {review.patientName}</p>
              <p>Feedback: {review.feedback}</p>
              <p>Rating: {review.rating}</p>
              <button onClick={() => handleEditReview(Number(doctorId))}>
                Edit
              </button>
              {editingReviewId === Number(doctorId) && (
                <ReviewForm
                  doctorId={Number(doctorId)}
                  onSubmit={handleUpdateReview}
                  initialReviewData={review}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reviews;

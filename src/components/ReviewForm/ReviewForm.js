// src/components/ReviewForm/ReviewForm.js
import React, { useState, useEffect } from "react";
import "../ReviewForm/ReviewForm.css";

function ReviewForm({ doctorId, onSubmit, initialReviewData }) {
  const [patientName, setPatientName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (initialReviewData) {
      setPatientName(initialReviewData.patientName);
      setFeedback(initialReviewData.feedback);
      setRating(initialReviewData.rating);
    } else {
      setPatientName("");
      setFeedback("");
      setRating(0);
    }
  }, [initialReviewData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(doctorId, { patientName, feedback, rating });
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? "filled" : ""}`}
          onClick={() => setRating(i)}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h2>{initialReviewData ? "Edit Review" : "Write a Review"}</h2>
      <label htmlFor="patientName">Patient Name:</label>
      <input
        type="text"
        id="patientName"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
      />
      <label htmlFor="feedback">Feedback:</label>
      <textarea
        id="feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      ></textarea>
      <label>Rating:</label>
      <div className="star-rating">{renderStars()}</div>
      <button type="submit">
        {initialReviewData ? "Update Review" : "Submit Review"}
      </button>
    </form>
  );
}

export default ReviewForm;

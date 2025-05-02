// src/components/LandingPage.js
import React from "react";
import bgImage from "../Pictures/3d-medical-background-with-dna-strands.jpg"; // Import the image

function LandingPage() {
  return (
    <section className="landing-page">
      <img className="bg-image" src={bgImage} alt="Background" />
      <div className="landing-content">
        <h1 className="headline">
          Your Health
          <br />
          Our Responsibility
        </h1>
        <p className="quote">
          "Embrace the art of self-care, for a healthy mind and body forge the
          foundation of a vibrant life. Wellness is not just a destination; it's
          a journey of mindful choices and daily transformations. Nurture your
          health with love, and watch it bloom into a beacon of joy and
          vitality."
        </p>
        <button className="get-started-btn">Get Started</button>
      </div>
    </section>
  );
}

export default LandingPage;

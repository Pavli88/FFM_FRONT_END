import React from "react";
import "./HeroSection.css";

export const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="background-images">
        <img src="/landing_page/herosection/img/vector_left.svg" alt="bg" className="img-left"/>
        <img src="/landing_page/herosection/img/vector_right.svg" alt="bg" className="img-right"/>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">Where strategies connect minds.</h1>
        <p className="hero-description">
          Fractal turns portfolio management into a social experience. Share your approach,
          and connect with like-minded traders through meaningful insights.
        </p>
      </div>
    </section>
  );
};

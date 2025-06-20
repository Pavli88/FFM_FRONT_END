import React from "react";
import "./CTASection.css";
import InputField from "../../../components/InputField/InputField";

export const CTASection = () => {
  return (
    <section id="cta" className="cta-section">
      <div className="cta-glow" />
      <h2 className="cta-heading">Start your journey now!</h2>
      <div className="cta-form">
          <input  id="email" type="text" value={""} placeholder={"Your email"} />
          <button className="cta-button">Get early access</button>
      </div>
    </section>
  );
};

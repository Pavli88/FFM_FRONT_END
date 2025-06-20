import React from "react";
import "./ContentSection.css";

export const ContentSection = () => {
  return (
    <section className="content-section">
      <div className="content-image">
        <img
          src="/landing_page/contentSection/img/vector_shape.svg"
          alt="Network visualization"
          className="network-img"
        />
      </div>
      <div className="content-text">
        <h2 className="content-heading">
          Many minds, many methods in one platform.
        </h2>
        <p className="content-description">
          A portfolio management platform where you can share insights,
          and connect with others. Built-in analytics empower you to
          track your performance and trade with clarity.
        </p>
      </div>
    </section>
  );
};

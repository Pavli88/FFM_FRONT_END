import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-backgrounds">
        <img src="/landing_page/footer/img/footer_vector_left.svg" alt="left" className="footer-img-left" />
        <img src="/landing_page/footer/img/footer_vector_right.svg" alt="right" className="footer-img-right" />
      </div>

      <div className="footer-content">
        <h2 className="footer-title">Where strategies connect minds.</h2>

        <div className="footer-news">
          <button className="footer-news-button">RECEIVE NEWS</button>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4>NAVIGATION</h4>
            <p>Home</p>
            <p>Support us on Patreon</p>
          </div>

          <div className="footer-column">
            <h4>SUPPORT</h4>
            <p>Contact support</p>
            <p>Bug report</p>
            <p>Feature request</p>
            <p>Account help</p>
          </div>

          <div className="footer-column">
            <h4>TALK TO US</h4>
            <p>support@fractalportfolios.com</p>
            <p>Discord</p>
          </div>
        </div>

        <div className="footer-icon">
          <img src="/landing_page/footer/img/discord.svg" alt="discord" />
        </div>

        <p className="footer-copy">© 2025 Fractal Portfolios. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

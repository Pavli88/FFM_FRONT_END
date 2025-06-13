import React from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const history = useHistory();

  return (
    <header>
      <div className="header-content">
        <div className="logo-group">
          <img className="logo" alt="Logo" src="/landing_page/img/logo.png" />
          <div className="company-name">Fractal Portfolios</div>
        </div>
        <nav className="nav-links">
          <div className="nav-item">FEATURES</div>
          <div className="nav-item">PRICING</div>
          <div className="nav-item">BLOG</div>
          <div className="nav-item">SOCIAL</div>
          <div className="nav-item">ABOUT</div>
        </nav>
        <div className="auth-buttons">
          <button className="login" onClick={() => history.push("/login/")}>
            <div className="overlap-group">Log In</div>
          </button>
          <button className="sign-up" onClick={() => history.push("/sign_up/")}>
            <div className="text-wrapper">Sign Up</div>
          </button>
        </div>
      </div>
    </header>
  );
};

import React from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const history = useHistory();
  return (
    <header className="header">
      <div className="logo-container">
        <img className="logo" alt="Logo" src="/main/logo.png"/>
        <span className="company-name">Fractal Portfolios</span>

      </div>

        <div className="header-button-group">
            <button className="header-button header-button-login" onClick={() => history.push("/login/")}>Log In
            </button>
            <button className="header-button header-button-free-trial" onClick={() => {
                document.getElementById("cta")?.scrollIntoView({behavior: "smooth"});
            }}>Get early access
            </button>
        </div>
    </header>
  );
};

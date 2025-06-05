import React from "react";
import "./LoginAsVariant.css";

export const LoginAsVariant = ({ className }) => {
  return (
    <div className={`login-as-variant ${className}`}>
      <div className="login-as-title">Login as</div>

      <div className="overlap-group-2">
        <div className="group">
          <img className="ellipse" alt="Ellipse" src="/sign_in/img/ellipse-3-3.svg" />

          <div className="group-2">
            <div className="text-wrapper-3">Username</div>

            <div className="text-wrapper-4">Active 1 days ago</div>
          </div>
        </div>

        <div className="cancel">
          <div className="group-3" />
        </div>
      </div>
    </div>
  );
};
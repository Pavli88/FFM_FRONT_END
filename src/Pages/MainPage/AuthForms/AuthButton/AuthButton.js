import React from "react";
import "./AuthButton.css";

export const AuthButton = ({ label, className, handleLogin, loading, error }) => {
    return (
        <div className={`sign-in-button ${className}`}>
            <button onClick={handleLogin} disabled={loading}>
                {label}
            </button>
            <div className="errors">{error && <p className="error-message">{error}</p>}</div>
        </div>
    );
};


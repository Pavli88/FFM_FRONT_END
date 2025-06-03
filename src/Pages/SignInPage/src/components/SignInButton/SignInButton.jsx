/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const SignInButton = ({ label, className, handleLogin, loading, error }) => {
    return (
        <div className={`sign-in-button ${className}`}>
            <button onClick={handleLogin} disabled={loading}>
                {label}
            </button>
            <div className="errors">{error && <p className="error-message">{error}</p>}</div>
        </div>
    );
};



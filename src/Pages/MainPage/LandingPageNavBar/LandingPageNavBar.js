import React from "react";
import {useHistory} from "react-router-dom";

const LandingPageNavBar = () => {
    const history = useHistory();

    const goToSignUp = () => {
        history.push('/sign_up/');
    };

    const goToSignIn = () => {
        history.push('/login/');
    };

    return (
        <div className="landing-navbar">
            <button className="landing-button" onClick={goToSignUp}>
                Sign Up
            </button>
            <button className="landing-button" onClick={goToSignIn}>
                Sign In
            </button>
        </div>
    );
};
export default LandingPageNavBar;
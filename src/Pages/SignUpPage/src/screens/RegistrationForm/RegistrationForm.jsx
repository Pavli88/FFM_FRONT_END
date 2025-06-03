import React, {useContext, useEffect, useState} from "react";
import { SocialButtonAppleVariant } from "../../icons/SocialButtonAppleVariant";
import { SocialButtonFacebookVariant } from "../../icons/SocialButtonFacebookVariant";
import Tooltip from "../../../../../components/Tooltips/Tooltip";
import "./style.css";
import InputField from "../../../../../components/InputField/InputField";
import {useHistory} from "react-router-dom";
import AuthContext from "../../../../../context/AuthProvider";
import {passwordPolicyText} from "../../../../../config files/constants";
import {registerUser} from "../../../../../endpoints/authservice";
import {SignInButton} from "../../../../SignInPage/src/components/SignInButton";

export const RegistrationForm = ({ onClose, show, initialForm = "login" }) => {
  const [showSignup, setShowSignup] = useState(initialForm === "signup");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const history = useHistory();

  const {setAuth} = useContext(AuthContext);

  useEffect(() => {
    setShowSignup(initialForm === "signup");
  }, [initialForm]);

  const handleRegister = async (e) => {
    setErrors({});
    const response = await registerUser(username, email, password);
    if (!response.success) {
      setErrors(response.errors);
      return;
    }

    setUsername("");
    setEmail("");
    setPassword("");
    alert("Registration successful!");
    setShowSignup(false);
  };

  return (
  <div className="registration">
    <div className="overlap-wrapper">
      <div
        style={{
          backgroundImage: 'url(/sign_up/img/background.png)',
          backgroundPosition: '50% 50%',
          backgroundSize: 'cover',
          height: '900px',
          position: 'relative',
        }}
      >
        <img className="logo" alt="Logo" src="sign_up/img/logo.png" />

        <div className="sign-in-component">
          <div className="overlap-2">
            <div className="welcome">
              <p className="welcome-to-fractal">
                <span className="span">Join </span>
                <span className="text-wrapper-5">Fractal Portfolios</span>
              </p>

              <p className="no-account-sign-up">
                <span className="text-wrapper-6">
                  Already have an account?<br />
                </span>
                <span className="text-wrapper-7">Sign in</span>
              </p>
            </div>

            <div className="text-wrapper-8">Sign up</div>

            <div className="enter-your-username">
              <p className="text-wrapper-9">Choose a username</p>
              <div className="wrapper">
                <InputField
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrors({});
                  }}
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div className="enter-your-email">
              <p className="text-wrapper-9">Enter your email</p>
              <div className="wrapper">
                <InputField
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({});
                  }}
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>

            <div className="enter-your-password">
              <p className="text-wrapper-9">Create a password</p>
              <div className="wrapper">
                <InputField
                  id="password"
                  type={"password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({});
                  }}
                  placeholder="Enter password"
                  tooltipText={passwordPolicyText}
                  required
                />
              </div>
            </div>

            <div className="social-button-google">
              <img
                className="social-icon"
                alt="Social icon"
                src="sign_up/img/social-icon.svg"
              />
              <div className="text">Sign up with Google</div>
            </div>

            <SocialButtonFacebookVariant className="social-button" />
            <SocialButtonAppleVariant className="social-button-apple" />

            <SignInButton
              className="sign-in-button-variant"
              handleLogin={handleRegister}
              loading={loading}
              error={errors.general}
              label={"Sign Up"}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

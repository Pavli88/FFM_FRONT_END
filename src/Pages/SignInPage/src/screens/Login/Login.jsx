import React, {useContext, useEffect, useState} from "react";
import { SignInButton } from "../../components/SignInButton";
import { SocialButtonAppleVariant1 } from "../../icons/SocialButtonAppleVariant1";
import { SocialButtonFacebookVariant1 } from "../../icons/SocialButtonFacebookVariant1";
import "./style.css";
import {useHistory} from "react-router-dom";
import AuthContext from "../../../../../context/AuthProvider";
import {forgotPassword, login, registerUser} from "../../../../../endpoints/authservice";
import InputField from "../../../../../components/InputField/InputField";
import CustomModal from "../../../../../components/Modals/Modals";
import {RegistrationForm} from "../../../../SignUpPage/src/screens/RegistrationForm";


const Login = ({ onClose, show, initialForm = "login" }) => {
    const [showSignup, setShowSignup] = useState(initialForm === "signup");
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [resetMessage, setResetMessage] = useState("");
    const history = useHistory();

    const { setAuth } = useContext(AuthContext);

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

    const handleLogin = async () => {
        setError("");
        setLoading(true);
        try {
            await login(username, password);
            alert("Login successful!");
            setAuth({ userAllowedToLogin: true });
            onClose();
            history.push("/");
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        setResetMessage("");
        setError("");
        setLoading(true);
        try {
            const response = await forgotPassword(email);
            setResetMessage(response);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const forgotPasswordForm = (
        <CustomModal show={show}
                     onClose={onClose}
                     title={
                         <h2 className="modal-title">
                             Reset Password
                         </h2>
                     }>
            <InputField
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                    setResetMessage("");
                }}
                placeholder="Enter your email"
                label="Enter your email"
                required
            />
            <div className="button-group">
                <button onClick={handleForgotPassword} disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
          <button onClick={() => {
            setShowForgotPassword(false);
            setError("");
            setResetMessage("");
          }}>
            Back to Login
          </button>
        </div>
        {resetMessage && <p className="success-message">{resetMessage}</p>}
        {error && <p className="error-message">{error}</p>}
      </CustomModal>
  );

  const loginForm = (
      <div className="login">
        <div className="overlap-wrapper">
          <div style={{
            backgroundImage: 'url(/sign_in/img/background-1.png)',
            backgroundPosition: '50% 50%',
            backgroundSize: 'cover',
            height: '900px',
            position: 'relative',
          }}>
            <img className="logo" alt="Logo" src="sign_in/img/logo-1.png"/>

            <div className="sign-in-component">
              <div className="overlap-2">
                <div className="welcome">
                  <p className="welcome-to-fractal">
                    <span className="span">Welcome to </span>

                    <span className="text-wrapper-5">Fractal Portfolios</span>
                  </p>

                  <p className="no-account-sign-up">
                  <span className="text-wrapper-6">
                    No Account ?<br/>
                  </span>

                    <span className="text-wrapper-7">Sign up</span>
                  </p>
                </div>

                <div className="text-wrapper-8">Sign in</div>

                <div className="enter-your-username">
                  <p className="text-wrapper-9">
                    Enter your username
                  </p>
                    <div className="wrapper">
                        <InputField
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setError("");
                            }}
                            placeholder="Enter username"
                            required
                        />
                    </div>

                </div>

                <div className="enter-your-password">
                  <div className="text-wrapper-9">Enter your Password</div>

                    <div className="wrapper">
                        <InputField
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError("");
                            }}
                            placeholder="Enter password"
                            required
                        />
                  </div>
                </div>
                  <a
                      href="#"
                      className="text-wrapper-11"
                      onClick={(e) => {
                          e.preventDefault();
                          setShowForgotPassword(true);
                          setError("");
                          setResetMessage("");
                      }}
                  >
                      Forgot password?
                  </a>

                <div className="social-button-google">
                  <img
                      className="social-icon"
                      alt="Social icon"
                      src="sign_in/img/social-icon-1.svg"
                  />

                  <div className="text">Sign in with Google</div>
                </div>

                <SocialButtonFacebookVariant1 className="social-button"/>
                <SocialButtonAppleVariant1 className="social-button-apple"/>
                <SignInButton className="sign-in-button-variant" handleLogin={handleLogin} loading={loading} error={error} label={"Sign in"}/>
              </div>
            </div>

            {/*<div className="login-as">*/}
            {/*  <div className="text-wrapper-12">Login as</div>*/}

            {/*  <LoginAsVariant className="login-as-variant-instance"/>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
  );

    const signupForm = <RegistrationForm/>;

    console.log('showSignup', showSignup);
    return show ? (
        <div className="modal-backdrop" onClick={onClose}>
            <div
                className="login-modal"
                onClick={(e) => e.stopPropagation()}
            >
                {showForgotPassword ? forgotPasswordForm : showSignup ? signupForm : loginForm}
            </div>
        </div>
    ) : null;
};

export default Login;
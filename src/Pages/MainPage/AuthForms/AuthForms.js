import React, { useState, useContext, useEffect } from "react";
import "./AuthForms.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";
import { forgotPassword, login, registerUser } from "../../../endpoints/authservice";
import InputField from "../../../components/InputField/InputField";
import CustomModal from "../../../components/Modals/Modals";
import { passwordPolicyText } from "../../../config files/constants";
import Tooltip from "../../../components/Tooltips/Tooltip";

const AuthForms = ({ onClose, show, initialForm = "login" }) => {
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
        <div>
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
        </div>
    );

    const loginForm = (
        <div className="form-content">

            <div className="field input-field">
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
            <div className="field input-field">
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
                <i onClick={() => setShowPassword(!showPassword)} className="eye-icon">
                    {showPassword ? <FaEyeSlash/> : <FaEye/>}
                </i>
            </div>
            <div className="form-link">
                <a
                    href="#"
                    className="forgot-pass"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowForgotPassword(true);
                        setError("");
                        setResetMessage("");
                    }}
                >
                    Forgot password?
                </a>
            </div>
            <div className="field button-field">
                <button onClick={handleLogin} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}
            <div className="form-link">
                <span>
                    Don't have an account?
                    <a onClick={(e) => {
                        setShowSignup(true);
                        setError("");
                        setResetMessage("");
                    }} className="link signup-link"> Signup</a>
                </span>
            </div>
        </div>
    );

    const signupForm = (
        <div className="form signup">
            <div className="form-content">
                <div className="field input-field">
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
                        error={errors.username}
                    />
                </div>
                <div className="field input-field">
                    <InputField
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors({});
                        }}
                        placeholder="Enter email"
                        required
                        error={errors.email}
                    />
                </div>
                <div className="field input-field password-tooltip-container">
                    <InputField
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors({});
                        }}
                        placeholder="Enter password"
                        error={errors.password}
                    />
                    <Tooltip text={passwordPolicyText}/>
                </div>
                <div className="field button-field" >
                    <button onClick={handleRegister}>Signup</button>
                </div>
                {errors.general && (
                    <p style={{marginBottom: "-10px"}}>{errors.general}</p>
                )}

                <div className="form-link">
                    <span>
                        Already have an account?
                        <a onClick={(e) => {
                            setShowSignup(false);
                            setErrors({});
                            setResetMessage("");
                        }} className="link login-link"> Login</a>
                    </span>
                </div>
            </div>
            <div className="line"></div>
            <div className="media-options">
                <a href="#" className="field facebook">
                    <BsFacebook className="facebook-icon"/>
                    <span>Login with Facebook</span>
                </a>
            </div>
        </div>
    );

    return (
        <CustomModal
            show={show}
            onClose={onClose}
            title={
                <h2 className="modal-title">
                    {showForgotPassword ? "Reset Password" : showSignup ? "Signup" : "Login"}
                </h2>
            }
        >
            <section className={`container forms ${showSignup ? "show-signup" : ""}`}>
                {showForgotPassword ? (
                    forgotPasswordForm
                ) : showSignup ? (
                    signupForm
                ) : (
                    <div className="form login">
                        {loginForm}
                        <div className="line"></div>
                        <div className="media-options">
                            <a href="#" className="field facebook">
                                <BsFacebook className="facebook-icon" />
                                <span>Login with Facebook</span>
                            </a>
                        </div>
                    </div>
                )}
            </section>
        </CustomModal>
    );
};

export default AuthForms;

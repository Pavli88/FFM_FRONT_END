import './SignUpPage.css';
import InputField from "../../../components/InputField/InputField";
import Tooltip from "../../../components/Tooltips/Tooltip";
import { passwordPolicyText } from "../../../config files/constants";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SocialButtonFacebookVariant } from "../AuthForms/icons/SocialButtonFacebookVariant";
import { SocialButtonAppleVariant } from "../AuthForms/icons/SocialButtonAppleVariant";
import { AuthButton } from "../AuthForms/AuthButton/AuthButton";
import React, { useState } from "react";
import { registerUser } from "../../../endpoints/authservice";
import { Link } from "react-router-dom";

const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const resetFormFields = () => {
        setUsername("");
        setPassword("");
        setEmail("");
    };

    const handleRegister = async () => {
        setErrors({});
        const response = await registerUser(username, email, password);
        if (!response.success) {
            setErrors(response.errors || {});
            return;
        }
        resetFormFields();
        alert("Registration successful!");
    };

    return (
        <div className="auth-wrapper">
            <img className="auth-logo" alt="Logo" src="/main/main_logo.png" />

            <div
                className="auth-background"
                style={{ backgroundImage: `url("/sign_in/img/background-1.png")` }}
            ></div>

            <div className="auth-container">
                <div className="auth-box">
                    <div className="auth-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p className="auth-title" style={{ margin: 0 }}>
                            <span className="auth-span">Join</span>
                            <span className="auth-highlight"> Fractal Portfolios</span>
                        </p>
                        <p className="auth-switch" style={{ margin: 0, textAlign: "right" }}>
                            <span className="auth-muted">
                                Already have an account?{" "}
                                 <br />
                                <Link className="auth-link" to="/login/">Sign In</Link>
                            </span>
                        </p>
                    </div>

                    <div className="auth-form-title">Sign Up</div>

                    <div className="auth-form-content">
                        <div className="auth-input-group">
                            <label className="auth-label">Choose a username</label>
                            <div className="auth-input-wrapper">
                                <InputField
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        setError("");
                                        setErrors({});
                                    }}
                                    placeholder="Enter username"
                                    required
                                />
                            </div>
                            {errors.username && (
                                <p className="auth-error-message">{errors.username}</p>
                            )}
                        </div>

                        <div className="auth-input-group">
                            <label className="auth-label">Enter your email</label>
                            <div className="auth-input-wrapper">
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
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                />
                            </div>
                            {errors.email && (
                                <p className="auth-error-message">{errors.email}</p>
                            )}
                        </div>

                        <div className="auth-input-group">
                            <div className="auth-label-with-tooltip">
                                <label className="auth-label">Create a password</label>
                                <div className="tooltip-inline-icon">
                                    <Tooltip text={passwordPolicyText} />
                                </div>
                            </div>
                            <div className="auth-password-wrapper">
                                <InputField
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError("");
                                        setErrors({});
                                    }}
                                    placeholder="Enter password"
                                    required
                                />
                                <i
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="eye-icon"
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </i>
                            </div>
                            {errors.password && (
                                <p style={{ maxHeight: 60, overflowY: 'auto' }}>{errors.password}</p>
                            )}
                        </div>

                        <div className="auth-social-wrapper">
                            <button className="auth-social" style={{ backgroundColor: "#fff", border: "1px solid #000" }}>
                                <img className="social-icon" alt="Google icon" src="/sign_in/img/social-icon-1.svg" />
                                <span className="social-text" style={{ color: "#000" }}>
                                    Sign up with Google
                                </span>
                            </button>
                            <div className="auth-social-icon">
                                <SocialButtonFacebookVariant />
                            </div>
                            <div className="auth-social-icon">
                                <SocialButtonAppleVariant />
                            </div>
                        </div>

                        <AuthButton
                            className="auth-submit-button"
                            handleLogin={handleRegister}
                            loading={loading}
                            error={errors.general}
                            label={"Sign Up"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;

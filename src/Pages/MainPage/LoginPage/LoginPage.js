import './LoginPage.css'
import InputField from "../../../components/InputField/InputField";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {SocialButtonFacebookVariant1} from "../AuthForms/icons/SocialButtonFacebookVariant1";
import {SocialButtonAppleVariant1} from "../AuthForms/icons/SocialButtonAppleVariant1";
import {AuthButton} from "../AuthForms/AuthButton/AuthButton";
import React, {useContext, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";
import {login} from "../../../endpoints/authservice";

const LoginPage = () => {
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
    const {setAuth} = useContext(AuthContext);

    const clearFormErrors = () => {
        setError("");
        setErrors({});
        setResetMessage("");
    };

    const resetFormFields = () => {
        setUsername("");
        setPassword("");
        setEmail("");
    };
    const handleLogin = async () => {
        setError("");
        setLoading(true);
        try {
            await login(username, password);
            // 🔔 Replace with toast: toast.success("Login successful!");
            alert("Login successful!");
            setAuth({userAllowedToLogin: true});
            history.push("/");
        } catch (err) {
            setError(err?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="auth-wrapper">
            <img className="auth-logo" alt="Logo" src="/main/main_logo.png"/>

            <div
                className="auth-background"
                style={{backgroundImage: `url("/main/background-1.png")`}}
            ></div>

            <div className="auth-container">
                <div className="auth-box">
                    <div className="auth-header"
                         style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <p className="auth-title" style={{margin: 0}}>
              <span className="auth-span">
                {"Welcome to "}
              </span>
                            <span className="auth-highlight">Fractal Portfolios</span>
                        </p>
                        <p className="auth-switch" style={{margin: 0, textAlign: "right"}}>
              <span className="auth-muted">
                {"No account?"}
                  <Link className="menu-button" to="/sign_up/">Sign Up</Link>
              </span>

                        </p>
                    </div>

                    <div className="auth-form-title">
                        {"Sign In"}
                    </div>

                    <div className="auth-form-content">
                        <div className="auth-input-group">
                            <label className="auth-label">
                                {"Enter your username"}
                            </label>
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
                        </div>

                        <div className="auth-input-group">
                            <div className="auth-label-with-tooltip">
                                <label className="auth-label">
                                    {"Enter your password"}
                                </label>
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
                                <i onClick={() => setShowPassword(!showPassword)} className="eye-icon">
                                    {showPassword ? <FaEyeSlash/> : <FaEye/>}
                                </i>
                            </div>
                        </div>


                        <div style={{textAlign: "right", marginBottom: "8px"}}>
                            <button
                                className="auth-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowForgotPassword(true);
                                    clearFormErrors();
                                }}
                            >
                                Forgot password?
                            </button>
                        </div>


                        <div className="auth-social-wrapper">
                            <button className="auth-social" style={{backgroundColor: "#fff", border: "1px solid #000"}}>
                                <img className="social-icon" alt="Google icon" src="sign_in/img/social-icon-1.svg"/>
                                <span className="social-text" style={{color: "#000"}}>
                  {"Sign in with Google"}
                </span>
                            </button>
                            <div className="auth-social-icon">
                                <SocialButtonFacebookVariant1/>
                            </div>
                            <div className="auth-social-icon">
                                <SocialButtonAppleVariant1/>
                            </div>
                        </div>

                        <AuthButton
                            className="auth-submit-button"
                            handleLogin={handleLogin}
                            loading={loading}
                            error={error}
                            label={"Sign In"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;
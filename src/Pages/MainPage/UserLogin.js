import React, { useState, useContext, useRef, useEffect } from "react";
import { login, forgotPassword } from "../../endpoints/authservice";
import AuthContext from "../../context/AuthProvider";
import {useHistory} from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import Form from "../../components/Form/Form";

const UserLogin = ({ onClose }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [resetMessage, setResetMessage] = useState("");
    const history = useHistory();

    const { setAuth } = useContext(AuthContext);
    const modalRef = useRef(null);

    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault();
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

    // Handle forgot password
    const handleForgotPassword = async (e) => {
        e.preventDefault();
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

    // Close modal when clicking outside
    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
            history.push("/");
        }
    };

    // Add event listener when the component mounts
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []); // Empty dependency array to run once when the component mounts

    return (
        <div className="modal-overlay">
            <div className="modal-container" ref={modalRef}>
                <h2 className="modal-title">{showForgotPassword ? "Reset Password" : "Login"}</h2>

                {error && <p className="error-message">{error}</p>}
                {resetMessage && <p className="success-message">{resetMessage}</p>}

                {!showForgotPassword ? (
                    <Form onSubmit={handleLogin} className="form-body">
                        <InputField
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setError("");
                            }}
                            placeholder="Enter username"
                            label="Username"
                            required
                        />

                        <InputField
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError("");
                            }}
                            placeholder="Enter password"
                            label="Password"
                            required
                        />
                        <div>
                            <button type="submit" disabled={loading} style={{display: "block", marginBottom: "10px"}}>
                                {loading ? "Logging in..." : "Login"}
                            </button>

                            <p
                                onClick={() => {
                                    setShowForgotPassword(true);
                                    setError("");
                                    setResetMessage("")
                                }}
                                style={{
                                    color: "blue",
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                    textAlign: "center"
                                }}
                            >
                                Forgot Password?
                            </p>
                        </div>

                    </Form>
                ) : (
                    <Form onSubmit={handleForgotPassword}>
                        <InputField
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError(""); // Clear error on user input
                            }}
                            placeholder="Enter your email"
                            label="Enter your email"
                            required
                        />

                        <div className='button-group'>
                            <button type="submit" disabled={loading}>
                                {loading ? "Sending..." : "Send Reset Link"}
                            </button>


                            <button type="button" onClick={() => {
                                setShowForgotPassword(false);
                                setError("");
                                setResetMessage("");
                            }}>
                                Back to Login
                            </button>
                        </div>
                    </Form>
                )}
            </div>
        </div>
    );
};

export default UserLogin;

import React, { useState, useContext } from "react";
import { login, forgotPassword } from "../../endpoints/authservice";
import AuthContext from "../../context/AuthProvider";
import {useHistory} from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import Form from "../../components/Form/Form";
import CustomModal from "../../components/Modals/Modals";
import ModalButton from "../../components/Modals/ModalButton";

const UserLogin = ({ close, show }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [resetMessage, setResetMessage] = useState("");
    const history = useHistory();

    const { setAuth } = useContext(AuthContext);

    // Handle login
    const handleLogin = async () => {
        setError("");
        setLoading(true);
        try {
            await login(username, password);
            alert("Login successful!");
            setAuth({ userAllowedToLogin: true });
            close();
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

    const forgotButtons =
        <div className="button-group">
            <button onClick={() => handleForgotPassword()} disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <button onClick={() => {
                setShowForgotPassword(false);
                setError("");
                setResetMessage("");
            }}>Back to Login
            </button>
        </div>

    const loginButtons =
        <div className="button-group">
            <button onClick={() => handleLogin()} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
            <button onClick={() => {
                setShowForgotPassword(true);
                setError("");
                setResetMessage("");
            }} disabled={loading}>
                Forgot Password
            </button>
        </div>

    const loginForm = <div>
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
    </div>

    const forgotPasswordForm = <div>
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
    </div>

    return (
        <CustomModal
            show={show}
            onClose={close}
            title={showForgotPassword ? "Reset Password" : "Login"}
            footer={!showForgotPassword ? loginButtons: forgotButtons}
        >
            {error && <p className="error-message">{error}</p>}
            {resetMessage && <p className="success-message">{resetMessage}</p>}

            {/* Login Form */}
            {!showForgotPassword ? loginForm : forgotPasswordForm}
        </CustomModal>
    );
};


export default UserLogin;

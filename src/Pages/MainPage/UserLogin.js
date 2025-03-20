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
    const handleLogin = async (e) => {
        e.preventDefault();
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


    return (
        <CustomModal show={show} onClose={close} title={showForgotPassword ? "Reset Password" : "Login"}>
            {error && <p className="error-message">{error}</p>}
            {resetMessage && <p className="success-message">{resetMessage}</p>}

            {/* Login Form */}
            {!showForgotPassword ? (
                <Form onSubmit={handleLogin}>
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
                    <div className='button-group'>
                        <ModalButton type="submit" disabled={loading} label={loading ? "Logging in..." : "Login"}
                                     variant="primary"/>

                        <ModalButton onClick={() => {
                            setShowForgotPassword(true);
                            setError("");
                            setResetMessage("");
                        }} disabled={loading} label={"Forgot Password"}
                                     variant="primary"/>
                    </div>
                </Form>
            ) : (
                /* Forgot Password Form */
                <Form onSubmit={handleForgotPassword}>
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

                    <div className='button-group'>
                        <ModalButton type="submit" disabled={loading} label={loading ? "Sending..." : "Send Reset Link"}
                                     variant="primary"/>
                        <ModalButton type="button" onClick={() => setShowForgotPassword(false)} label="Back to Login"
                                     variant="secondary"/>
                    </div>
                </Form>
            )}
        </CustomModal>


    );
};


export default UserLogin;

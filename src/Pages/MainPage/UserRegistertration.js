import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../endpoints/authservice";
import InputField from "../../components/InputField/InputField";
import Form from "../../components/Form/Form";
import { passwordPolicyText } from "../../config files/constants";
import "./UserRegistration.css";
import "../../components/Form/Form.css";

const UserRegistration = ({ onClose }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const modalRef = useRef(null);

    useEffect(() => {

        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
                history.push("/");
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [onClose]);

const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});

    const response = await registerUser(username, email, password);

    if (!response.success) {
        // ✅ Update errors state properly
        setErrors(response.errors);
        return;
    }

    // ✅ Clear inputs and redirect if successful
    setUsername("");
    setEmail("");
    setPassword("");
    alert("Registration successful!");
    history.push("/login");
};


    return (
        <div className="modal-overlay">
            <div className="modal-container" ref={modalRef}>
                <h2 className="modal-title">Register</h2>
                <Form onSubmit={handleRegister} className="form-body">
                    <InputField
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setErrors({});
                        }}
                        placeholder="Enter username"
                        label="Username"
                        required
                        error={errors.username}
                    />

                    <InputField
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors({});
                        }}
                        placeholder="Enter email"
                        label="Email"
                        required
                        error={errors.email}
                    />

                    <InputField
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors({});
                        }}
                        placeholder="Enter password"
                        label="Password"
                        tooltipText={passwordPolicyText}
                        error={errors.password}
                    />

                    {errors.general && <p className="error general-error">{errors.general}</p>}
                    <div>
                        <button type="submit">Register</button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default UserRegistration;

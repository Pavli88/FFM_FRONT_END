import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../endpoints/authservice";
import "./UserRegistration.css";
import Tooltip from '../../components/Tooltips/Tooltip'

const UserRegistration = ({ onClose }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const modalRef = useRef(null);
    const passwordPolicyText = "Your password must contain at least 8 characters, including a number, an uppercase letter, " +
    "and at least one of the following special characters: !@#$%^&*()_+=-{}[]:;\"'<>,.?/";

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
                <form onSubmit={handleRegister} className="register-form" autoComplete="off">
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => { setUsername(e.target.value); setErrors({}) }}
                            placeholder="Enter username"
                            autoComplete="off"
                            required
                        />
                        {errors.username && <p className="error">{errors.username}</p>}
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors({})
                            }}
                            placeholder="Enter email"
                            autoComplete="off"
                            required
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    <div className="form-group password-group">
                        <div className="password-label-container">
                            <label>Password:</label>
                             <Tooltip text={passwordPolicyText}/>
                        </div>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors({});
                            }}
                            placeholder="Enter password"
                            autoComplete="off"
                            required
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>


                    {errors.general && <p className="error general-error">{errors.general}</p>}
                    <div>
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserRegistration;

import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../endpoints/authservice";
import "./UserRegistration.css";

const UserRegistration = ({ onClose }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const modalRef = useRef(null);  // Create a ref for the modal

    useEffect(() => {
        // Reset form and errors when compoconst navigate = useNavigate();nent is mounted
        setUsername("");
        setEmail("");
        setPassword("");
        setErrors({});

        // Add event listener to close modal if clicked outside
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                // Close the modal
                onClose(); // Use the onClose prop passed from the parent
                history.push("/");
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [onClose]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrors({}); // Reset previous errors

        try {
            await registerUser(username, email, password);
            setUsername("");
            setEmail("");
            setPassword("");
            history.push("/login"); // Redirect to login page on success
        } catch (err) {
            if (typeof err === "object") {
                setErrors(err); // Store field-based errors
            } else {
                setErrors({ general: err }); // Store generic error message
            }
        }
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
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            autoComplete="off"
                            required={true}
                        />
                        {errors.username && <p className="error">{errors.username}</p>}
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            autoComplete="off"
                            required={true}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            autoComplete="off"
                            required={true}
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

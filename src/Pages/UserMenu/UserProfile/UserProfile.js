import { FaUserCircle, FaEdit } from "react-icons/fa";
import { useContext, useState } from "react";
import UserContext from "../../../context/user-context";
import ChangePasswordModal from "./ChangePasswordModal";
import "./UserProfile.css";
import ServerContext from "../../../context/server-context";
import axios from "axios";

const UserProfile = () => {
    const { username, email, first_name, last_name, date_joined, last_login } = useContext(UserContext);
    const server = useContext(ServerContext).server;

    const [formData, setFormData] = useState({
        email: email || "",
        firstName: first_name || "",
        lastName: last_name || "",
        username: username || "",
        dateJoined: date_joined || "",
        lastLogin: last_login || "",
    });

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);


const handleChangePassword = async ({ oldPassword, newPassword }) => {
    const token = localStorage.getItem("access");

    if (!token) {
        setShowModal(false);
        alert("Session expired. Please log in again.");
        return;
    }

    try {
        const response = await axios.post(
            `${server}user/change_password/`,
            { old_password: oldPassword, new_password: newPassword },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // ✅ Invalidate tokens & force logout
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        alert("Password changed successfully! Please log in again.");
        window.location.href = "/login"; // Redirect to login page

    } catch (error) {
        console.error("Error response:", error.response?.data);  // ✅ Debugging remains

        if (error.response) {
            const errorData = error.response.data;

            // Check if the error contains a nested object with error messages
            let errorMessage = "";
            if (errorData.error) {
                // If errorData.error is an object, handle it properly
                if (errorData.error.new_password) {
                    // Handle specific new_password errors and join them
                    errorMessage = errorData.error.new_password.join(" ");
                } else {
                    errorMessage = Object.values(errorData.error)
                        .flat()
                        .join("");
                }
            } else {
                errorMessage = errorData?.error || "Something went wrong.";
            }

            // Ensure we throw the error message as a string
            throw new Error(String(errorMessage));
        } else {
            // If there is no response from the server
            throw new Error("No response from server.");
        }
    }
};

    return (
        <div className="page-container">
            <div className="container">
                <div className="container-body">
                    {/* Profile Section */}
                    <div className="container-section avatar-section">
                        <div className="avatar-upload">
                            <FaUserCircle className="avatar"/>
                            <button
                                className="edit-icon"
                                onClick={() => document.getElementById("avatar-input").click()}
                            >
                                <FaEdit className="edit-pen"/>
                            </button>
                        </div>
                        <input id="avatar-input" type="file" accept="image/*" style={{ display: "none" }} />
                    </div>

                    {/* Form Section */}
                    <div className="container-section form-section">
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" name="email" value={formData.email} readOnly />
                        </div>
                        <div className="form-group">
                            <label>First Name:</label>
                            <input type="text" name="firstName" value={formData.firstName} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input type="text" name="lastName" value={formData.lastName} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Username:</label>
                            <input type="text" name="username" value={formData.username} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Date joined:</label>
                            <span>{formData.dateJoined}</span>
                        </div>
                        <div className="form-group">
                            <label>Last login:</label>
                            <span>{formData.lastLogin}</span>
                        </div>

                        {/* Buttons */}
                        <div className="button-group">
                            <button onClick={() => setShowModal(true)}>Change Password</button>

                            {showModal && (
                                <ChangePasswordModal
                                    onClose={() => setShowModal(false)}
                                    onChangePassword={handleChangePassword}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

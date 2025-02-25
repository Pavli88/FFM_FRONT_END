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

    // ✅ Bug-fixed function to handle password change request
    const handleChangePassword = async ({ oldPassword, newPassword }) => {
        const token = localStorage.getItem("access");

        if (!token) {
            alert("Please log in again.");
            return;
        }

        try {
            const response = await axios.post(
                `${server}user/change_password/`,
                {
                    old_password: oldPassword,  // ✅ Ensure field names are correct
                    new_password: newPassword,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setShowModal(false);
            return response.data.message;  // ✅ Show success message


        } catch (error) {
            console.error("Error response:", error.response?.data);  // ✅ Debugging
            const errorMessage = error.response?.data?.error || "Something went wrong.";
            throw new Error(errorMessage);
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

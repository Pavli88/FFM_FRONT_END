import { FaUserCircle, FaEdit } from "react-icons/fa";
import React, { useContext, useState } from "react";
import UserContext from "../../../context/user-context";
import ChangePasswordModal from "./ChangePasswordModal";
import "./UserProfile.css";
import {changePassword} from "../../../endpoints/authservice";
import InputField from "../../../components/InputField/InputField";

const UserProfile = () => {
    const { username, email, first_name, last_name, date_joined, last_login } = useContext(UserContext);

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

    await changePassword(oldPassword, newPassword, token);
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
                        <InputField
                            id="email"
                            type="text"
                            value={formData.email}
                            label={"Email"}
                            readOnly
                        />
                        <InputField
                            id="firstName"
                            type="text"
                            value={formData.firstName}
                            label={"First Name"}
                            readOnly
                        />
                        <InputField
                            id="lastName"
                            type="text"
                            value={formData.lastName}
                            label={"Last Name"}
                            readOnly
                        />
                        <InputField
                            id="user"
                            type="text"
                            value={formData.username}
                            label={"User Name"}
                            readOnly
                        />
                        <div className="form-group">
                            <label>Date joined:</label>
                            <span>{formData.dateJoined}</span>
                        </div>
                        <div className="form-group">
                            <label>Last login:</label>
                            <span>{formData.lastLogin}</span>
                        </div>

                        <div className="button-group">
                            <button onClick={() => setShowModal(true)}>Change Password</button>

                            {showModal && (
                                <ChangePasswordModal
                                    show={showModal}
                                    close={() => setShowModal(false)}
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

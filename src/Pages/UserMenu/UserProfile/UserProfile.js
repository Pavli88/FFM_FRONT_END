import { FaUserCircle } from "react-icons/fa";
import React, { useContext, useState, useEffect, useRef } from "react";
import UserContext from "../../../context/user-context";
import ChangePasswordModal from "./ChangePasswordModal";
import "./UserProfile.css";
import { changePassword } from "../../../endpoints/authservice";
import InputField from "../../../components/InputField/InputField";
import fetchAPI from "../../../config files/api";
import ChangeEmailModal from "./ChangeEmailModal";

const UserProfile = () => {
    const { username, email, first_name, last_name, date_joined, image_url, followers, following } = useContext(UserContext).userData;
    const { fetchUserData } = useContext(UserContext);

    const [profileImage, setProfileImage] = useState(image_url || null);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isEditable, setIsEditable] = useState(false);

    const [userData, setUserData] = useState({
        "username": username,
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
    });

    const fileInputRef = useRef(null);

    useEffect(() => {
        setUserData({
            "username": username,
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
        });
    }, [username, email, first_name, last_name]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        handleUpload(event.target.files[0]);
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleUpload = async (file) => {
        if (!file) {
            alert("Please select an image.");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        try {
            setLoading(true);
            const response = await fetchAPI.post('/upload-profile-picture/', formData, {
                headers: {"Content-Type": "multipart/form-data"},
            });

            let imageUrl = response.data.image_url.startsWith("http")
                ? response.data.image_url
                : `${process.env.REACT_APP_BACKEND_URL}${response.data.image_url}`;

            // // Append a timestamp to prevent caching issues
            // imageUrl = `${imageUrl}?t=${Date.now()}`;

            setProfileImage(imageUrl);
            await fetchUserData();
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleDelete = async () => {
        try {
            setLoading(true);
            await fetchAPI.delete('/delete-profile-picture/', {});

            setProfileImage(null);
            await fetchUserData();
        } catch (error) {
            console.error("Delete failed:", error);
        } finally {
            setLoading(false);
        }
    };



    const handleChange = (key, value) => {
        setUserData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleEditToggle = () => {
        setIsEditable(!isEditable);
    };

    const handleSaveChanges = async () => {
        try {
            setLoading(true);
            await fetchAPI.post('/update-user-profile/', userData);
            setIsEditable(false);
            fetchUserData();
        } catch (error) {
            console.error("Update failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="header">
                <div className="avatar-section">
                    {profileImage ? (
                        <img src={profileImage} alt="Profile" className="avatar" />
                    ) : (
                        <FaUserCircle className="avatar" />
                    )}
                </div>
                <div className="user-info">
                    <h2 className="username">{username}</h2>
                    <div className="follower-following">
                        <div className="followers">
                            <strong>Followers</strong>
                            <span>{followers}</span>
                        </div>
                        <div className="following">
                            <strong>Following</strong>
                            <span>{following}</span>
                        </div>
                    </div>
                    <div className="joined-info">
                        <strong>Joined</strong>
                        <span>{new Date(date_joined).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            <div className="info-container">
                <div className="public-info">
                    <h3 className="section-header">Public Info</h3>
                    <InputField id="username" type="text" value={userData.username} label="Username" readOnly={true} disabled={true} />
                    <div className="avatar-upload-section">
                        <label>Avatar</label>
                        <div className="avatar-wrapper">
                            {profileImage ? <img src={profileImage} alt="Profile" className="small-avatar" /> : <FaUserCircle className="small-avatar" />}
                            <div className="avatar-info">
                                <button onClick={handleUploadClick}>Upload Photo</button>
                                <button onClick={handleDelete}>Delete Photo</button>
                            </div>
                        </div>
                    </div>
                    <InputField id="email" type="text" value={userData.email} label="Email" readOnly={!isEditable} onChange={(e) => handleChange('email', e.target.value)} />
                    <InputField id="firstName" type="text" value={userData.first_name} label="First Name" readOnly={!isEditable} onChange={(e) => handleChange('first_name', e.target.value)} />
                    <InputField id="lastName" type="text" value={userData.last_name} label="Last Name" readOnly={!isEditable} onChange={(e) => handleChange('last_name', e.target.value)} />

                    <div className="edit-buttons">
                        <button onClick={handleEditToggle}>{isEditable ? "Cancel" : "Edit"}</button>
                        {isEditable && <button onClick={handleSaveChanges} disabled={loading}>Save Changes</button>}
                    </div>
                </div>

                <div className="private-info">
                    <h3 className="section-header">Private Info</h3>
                    <div className="change-password-section">
                        <label>Password</label>
                        <button onClick={() => setShowChangePasswordModal(true)}>Change Password</button>
                    </div>
                    <div className="change-password-section">
                        <label>Email</label>
                        <button onClick={() => setShowEmailModal(true)}>Change Email</button>
                    </div>
                </div>
            </div>

            {showChangePasswordModal && (
                <ChangePasswordModal show={showChangePasswordModal} close={() => setShowChangePasswordModal(false)} onChangePassword={changePassword} />
            )}
            {showEmailModal && (
                <ChangeEmailModal show={showEmailModal} close={() => setShowEmailModal(false)}
                                     onEmailChangeSuccess={fetchUserData} />
            )}

            <input type="file" ref={fileInputRef} accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
        </div>
    );
};

export default UserProfile;

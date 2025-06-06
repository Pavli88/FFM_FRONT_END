import React, { useContext, useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./UserProfile.css";
import InputField from "../../../components/InputField/InputField";
import UserContext from "../../../context/user-context";
import fetchAPI from "../../../config files/api";
import ChangePasswordModal from "./ChangePasswordModal";
import { changePassword } from "../../../endpoints/authservice";
import ChangeEmailModal from "./ChangeEmailModal";
import Tabs from "../../../components/Tabs/Tabs";
import {useHistory} from "react-router-dom";

export default function UserProfile() {
    const [coverPhoto, setCoverPhoto] = useState(null);
    const {
        username,
        email,
        first_name,
        last_name,
        date_joined,
        image_url,
        followers_count,
        following_count
    } = useContext(UserContext).userData;
    const { fetchUserData } = useContext(UserContext);

    const history = useHistory();

    const [profileImage, setProfileImage] = useState(image_url || null);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isEditable, setIsEditable] = useState(false);

    const defaultCoverPhoto = "https://t4.ftcdn.net/jpg/03/84/11/51/240_F_384115163_mmVA7l40gCr4GdJm2TMYHVsgYecqU7Y6.jpg";

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

    const handleCoverPhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setCoverPhoto(URL.createObjectURL(file));
        }
    };

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
            const response = await fetchAPI.post('/upload_profile_picture/', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            let imageUrl = response.data.image_url.startsWith("http")
                ? response.data.image_url
                : `${process.env.REACT_APP_BACKEND_URL}${response.data.image_url}`;

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
            await fetchAPI.delete('/delete_profile_picture/', {});
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
            await fetchAPI.post('/update_user_profile/', userData);
            setIsEditable(false);
            fetchUserData();
        } catch (error) {
            console.error("Update failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        {
            id: "public",
            label: "Public Info",
            content: (
                <div className="public-info">
                    <InputField id="username" type="text" value={userData.username} label="Username" readOnly={true} disabled={true} />
                    <div className="avatar-upload-section">
                        <label>Avatar</label>
                        <div className="avatar-wrapper">
                            {profileImage ? <img src={profileImage} alt="Profile" className="small-avatar" /> :
                                <FaUserCircle className="small-avatar" />}
                            <div className="avatar-info">
                                <button onClick={handleUploadClick}>Upload Photo</button>
                                <button onClick={handleDelete}>Delete Photo</button>
                            </div>
                        </div>
                    </div>
                    <InputField id="email" type="text" value={userData.email} label="Email" readOnly={!isEditable}
                        onChange={(e) => handleChange('email', e.target.value)} />
                    <InputField id="firstName" type="text" value={userData.first_name} label="First Name"
                        readOnly={!isEditable}
                        onChange={(e) => handleChange('first_name', e.target.value)} />
                    <InputField id="lastName" type="text" value={userData.last_name} label="Last Name"
                        readOnly={!isEditable} onChange={(e) => handleChange('last_name', e.target.value)} />

                    <div className="edit-buttons">
                        <button onClick={handleEditToggle}>{isEditable ? "Cancel" : "Edit"}</button>
                        {isEditable && <button onClick={handleSaveChanges} disabled={loading}>Save Changes</button>}
                    </div>
                </div>
            )
        },
        {
            id: "private",
            label: "Private Info",
            content: (
                <div className="private-info">
                    <div className="change-password-section">
                        <label>Password</label>
                        <button onClick={() => setShowChangePasswordModal(true)}>Change Password</button>
                    </div>
                    <div className="change-password-section">
                        <label>Email</label>
                        <button onClick={() => setShowEmailModal(true)}>Change Email</button>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="user-page">

            <div className="cover-photo" style={{
                backgroundImage: `url(${coverPhoto || defaultCoverPhoto})`
            }}>
                {/* Cover photo upload elrejtve */}
            </div>

            <div className="content-container">

                <div className="left-panel">
                    <div className="avatar-section">
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="avatar" />
                        ) : (
                            <FaUserCircle className="avatar" />
                        )}
                    </div>
                    <h2 className="username">{username}</h2>
                    <div className="joined-info">
                        <strong>Joined</strong>
                        <span>{new Date(date_joined).toLocaleDateString()}</span>
                    </div>
                    <div className="user-stats">
                        <div>
                            <strong>Followers:</strong> {followers_count}
                        </div>
                        <div>
                            <strong>Following:</strong> {following_count}
                        </div>
                        <div>
                            <strong>Posts:</strong>
                        </div>
                    </div>
                    <button className="public-profile-btn" onClick={() => history.push(`/user/${username}`)}>View Public Profile</button>
                </div>

                <div className="right-panel">
                    <Tabs tabs={tabs} />

                    {showChangePasswordModal && (
                        <ChangePasswordModal
                            show={showChangePasswordModal}
                            close={() => setShowChangePasswordModal(false)}
                            onChangePassword={changePassword}
                        />
                    )}
                    {showEmailModal && (
                        <ChangeEmailModal
                            show={showEmailModal}
                            close={() => setShowEmailModal(false)}
                            onEmailChangeSuccess={fetchUserData}
                        />
                    )}
                    <input type="file" ref={fileInputRef} accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
                </div>
            </div>
        </div>
    );
}

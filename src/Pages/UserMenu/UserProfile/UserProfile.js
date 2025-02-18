import { FaUserCircle, FaEdit } from "react-icons/fa";
import { useContext, useState } from "react";
import ServerContext from "../../../context/server-context";
import AuthContext from "../../../context/AuthProvider";
import UserContext from "../../../context/user-context";
import "./UserProfile.css";

const UserProfile = () => {
    const { setAuth } = useContext(AuthContext);
    const server = useContext(ServerContext)["server"];
    const { user, email, firstName, lastName, dateJoined, lastLogin } = useContext(UserContext);

    const [formData, setFormData] = useState({
        email: email || "",
        firstName: firstName || "",
        lastName: lastName || "",
        username: user || "",
        dateJoined: dateJoined || "",
        lastLogin: lastLogin || "",
    });

    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle avatar change
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Save profile changes (mocked)
    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            console.log("Saved Data:", formData);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="page-container">
            <div className="container">
                <div className="container-body">
                    {/* Left Section - Avatar Upload */}
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
                        <div className="information-textbox">
                            JPG, GIF or PNG formats. Max file size is 500KB. Recommended image size
                            is 150x150 pixels.
                        </div>
                        <input
                            id="avatar-input"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            style={{display: "none"}}
                        />
                    </div>

                    {/* Right Section - Form Fields */}
                    <div className="container-section form-section">
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>First Name:</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Username:</label>
                            <input type="text" name="username" value={formData.username} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Date joined:</label>
                            <span>{formData.dateJoined}</span>
                        </div>
                        <div className="form-group">
                            <label>Last login:</label>
                            <span>{formData.lastLogin}</span>
                        </div>
                        <div className="form-buttons">
                            <button>Change Password</button>
                            <button onClick={handleSave} disabled={loading}>
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default UserProfile;


import { useState } from "react";
import "./ChangePasswordModal.css";
import { passwordPolicyText } from "../../../config files/constants";
import InputField from "../../../components/InputField/InputField";
import CustomModal from "../../../components/Modals/Modals";

const ChangePasswordModal = ({show, close, onChangePassword}) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);  // ✅ Added loading state
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            await onChangePassword({oldPassword, newPassword});

            setSuccess("Password changed successfully! Redirecting to login...");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");

            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);

        } catch (err) {
            setError(err.message || "Failed to change password. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const footerButtons = <div className="button-group">
        <button onClick={() => handleSubmit()}>
            {loading ? "Changing..." : "Change Password"}
        </button>
    </div>

    return (
        <CustomModal show={show} onClose={close} title={"Change Password"} tooltip={passwordPolicyText}

                     footer={footerButtons}
        >
            {error && <p className="error-message">{error}</p>}

            <InputField
                id="password"
                type="password"
                value={oldPassword}
                onChange={(e) => {
                    setOldPassword(e.target.value);
                    setError("");
                }}
                placeholder={"Current Password"}
                required
            />
            <InputField
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError("");
                }}
                placeholder={"New Password"}
                required
            />
            <InputField
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                }}
                placeholder={"Confirm Password"}
                required
            />
        </CustomModal>
    );
};

export default ChangePasswordModal;

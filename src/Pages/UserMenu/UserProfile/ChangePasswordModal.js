import React, { useState } from "react";
import "./ChangePasswordModal.css";
import Tooltip from "../../../components/Tooltips/Tooltip";
import Form from "../../../components/Form/Form";
import { passwordPolicyText } from "../../../config files/constants";
import InputField from "../../../components/InputField/InputField";

const ChangePasswordModal = ({ onClose, onChangePassword }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);  // ✅ Added loading state
  const [success, setSuccess] = useState("");

 const handleSubmit = async (e) => {
    e.preventDefault();

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
        await onChangePassword({ oldPassword, newPassword });

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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="password-label-container">
              <label className="title">Change Password</label>
              <Tooltip
                  text={passwordPolicyText}/>
          </div>
          {error && <p className="error-message">{error}</p>}

          <Form onSubmit={handleSubmit}>
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

          <div className="button-group" style={{ margin: "5px" }}>
            <button type="submit" disabled={loading}>
              {loading ? "Changing..." : "Change Password"}
            </button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;

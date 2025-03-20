import React, {useState} from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { passwordPolicyText } from "../../config files/constants";
import InputField from "../../components/InputField/InputField";
import "../../components/Modals/Modals.css";

const ResetPassword = ( ) => {
  const { reset_token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const history = useHistory();

const handleResetPassword = async (e) => {
    setError(null);
    setSuccess(null);

    try {
        const response = await axios.post(`${API_URL}user/reset_password/${reset_token}/`, {
            new_password: newPassword,
        });

        // If the response is successful
        setSuccess("Password reset successfully!");
        alert("Password reset successfully!");
        history.push("/");  // Redirect user after success
    } catch (err) {
        const errorData = err.response?.data;

        if (errorData && typeof errorData === "object") {
            if (errorData.detail) {
                // Handling specific backend error (e.g., invalid or expired reset token)
                setError(Array.isArray(errorData.detail) ? errorData.detail.join(" ") : errorData.detail);
            } else if (errorData.new_password) {
                // Handle validation errors for the new password
                setError(errorData.new_password.join(" "));
            } else if (errorData.error) {
                // General errors (for unexpected backend errors)
                setError(errorData.error);
            } else {
                // Fallback for unknown errors
                setError("An unknown error occurred. Please try again.");
            }
        } else {
            // Handle unexpected errors (like network issues or bad responses)
            setError("Something went wrong. Please try again.");
        }
    }
};

  return (
      <div className="modal-overlay">
          <div className="modal-container" style={{padding: "20px"}}>
              <h2 className="modal-title" style={{marginBottom: "20px"}}>Reset Your Password</h2>
              {error && <p style={{color: 'red'}}>{error}</p>}
              {success && <p style={{color: 'green'}}>{success}</p>}
              <div>
                  <InputField
                      id="password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => {
                          setNewPassword(e.target.value);
                          setError("");
                      }}
                      label="Enter new password"
                      tooltipText={passwordPolicyText}
                      required
                  />
              </div>
              <div className="button-group">
                  <button className="modal-button" onClick={() => handleResetPassword()}>Save</button>
              </div>
          </div>
      </div>
  );
};

export default ResetPassword;

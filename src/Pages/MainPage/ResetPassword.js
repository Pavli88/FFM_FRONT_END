import React, {useState} from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import {FiInfo} from "react-icons/fi";
import Tooltip from "../../components/Tooltips/Tooltip";


const ResetPassword = ( ) => {
  const { reset_token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const history = useHistory();
  const passwordPolicyText = "Your password must contain at least 8 characters, including a number, an uppercase letter, " +
    "and at least one of the following special characters: !@#$%^&*()_+=-{}[]:;\"'<>,.?/";


const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
        const response = await axios.post(`${API_URL}user/reset_password/${reset_token}/`, {
            new_password: newPassword,
        });

        // If the response is successful
        setSuccess("Password reset successfully!");
        alert("Password reset successfully!");
        history.push("/")
    } catch (err) {
        const errorData = err.response?.data;

        if (typeof errorData === "object" && errorData !== null) {
            console.log("HERE WE ARE");

            if (errorData.detail) {
                setError(Array.isArray(errorData.detail) ? errorData.detail.join(" ") : errorData.detail);
            }
            else if (errorData.new_password) {
                setError(errorData.new_password.join(" "));
            }
            else if (errorData.error) {
                setError(errorData.error);
            }
            else {
                setError("An unknown error occurred.");
            }
        } else {
            setError("Something went wrong. Please try again.");
        }
    }
};



  return (
      <div className="modal-overlay">
        <div className="modal-container">
          <h2 className="modal-title">Reset Your Password</h2>
          {error && <p style={{color: 'red'}}>{error}</p>}
          {success && <p style={{color: 'green'}}>{success}</p>}
          <form onSubmit={handleResetPassword}>
              <div>
                  <div className="password-label-container">
                      <label>New password:</label>
                      <Tooltip
                          text={passwordPolicyText}/>
                  </div>

                  <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
              />
            </div>
              <div>
                  <button style={{margin: "5px"}} type="submit">Reset Password</button>
              </div>
          </form>
        </div>
    </div>
  );
};

export default ResetPassword;

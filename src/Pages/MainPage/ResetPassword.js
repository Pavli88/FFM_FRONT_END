import React, {useState} from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';


const ResetPassword = () => {
  const { reset_token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const history = useHistory();

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

            // Check if error contains a 'detail' field
            if (errorData.detail) {
                setError(Array.isArray(errorData.detail) ? errorData.detail.join(" ") : errorData.detail);
            }
            // Check if error contains specific field errors (like 'new_password')
            else if (errorData.new_password) {
                setError(errorData.new_password.join(" "));
            }
            // Handle the generic error structure returned from your backend
            else if (errorData.error) {
                setError(errorData.error);  // Handle error from "error" field
            }
            // Handle unknown object-based errors
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
              <label>New Password</label>
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

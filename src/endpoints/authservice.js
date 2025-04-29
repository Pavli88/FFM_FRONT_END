import fetchAPI from "../config files/api";

export const registerUser = async (username, email, password) => {
    try {
        const response = await fetchAPI.post('user/register/', { username, email, password });
        return { success: true, message: "Registration successful!" };
    } catch (error) {
        console.error("Error response:", error.response?.data);

        let errors = {};

        if (error.response) {
            // ✅ Backend responded with an error (Validation, Server issue)
            const errorData = error.response.data;

            if (typeof errorData === "object") {
                Object.keys(errorData).forEach((field) => {
                    errors[field] = errorData[field].join(" ");
                });
            } else {
                errors.general = "An unexpected error occurred. Please try again.";
            }
        } else if (error.request) {
            // ✅ No response from the server (Network issue)
            errors.general = "Unable to connect to the server. Please check your internet connection.";
        } else {
            // ✅ Other unexpected errors
            errors.general = "Something went wrong. Please try again.";
        }

        return { success: false, errors };
    }
};


// Login function
export const login = async (username, password) => {
    try {
        const response = await fetchAPI.post('user/login/', { username, password });
        return response.data; // The response will just contain {"detail": "Login successful"}
    } catch (error) {
        let message = "Login failed";

        if (error.response && error.response.data && error.response.data.code === "token_not_valid") {
            // // If the token is expired or invalid, try to refresh the token
            try {
                const newAccessToken = await refreshToken(); // Call refreshToken to get a new access token
                // Optionally, you can store the new access token here (e.g., in cookies or localStorage)
                // After getting the new token, retry the login or proceed with the session
                return { access_token: newAccessToken };
            } catch (refreshError) {
                // Handle error when refresh token fails (e.g., session expired, user needs to log in again)
                throw "Session expired. Please login again.";
            }
            console.log('EXPIRED TOKEN')
        }

        if (error.response && error.response.data) {
            message = error.response.data.detail || "Something went wrong";
        }
        throw message;
    }
};

//Forgot password function
export const forgotPassword = async (email) => {
    try {
        const response = await fetchAPI.post('user/forgot_password/', { email });
        return response.data.detail;
    } catch (error) {
        // Handle specific error response or provide a fallback message
        if (error.response) {
            // Backend returned an error response (e.g., 400 or 404)
            return error.response.data.detail || "Failed to send password reset email";
        } else if (error.request) {
            // No response was received from the server
            return "Network error, please try again later.";
        } else {
            // General error in setting up the request
            return "An unexpected error occurred. Please try again.";
        }
    }
};

//Change password function
export const changePassword = async (oldPassword, newPassword, token) => {
    try {
        const response = await fetchAPI.post('user/change_password/',{old_password: oldPassword, new_password: newPassword});

        alert("Password changed successfully! Please log in again.");
        window.location.href = "/login"; // Redirect to login page

    } catch (error) {
        console.error("Error response:", error.response?.data);  // ✅ Debugging remains

        if (error.response) {
            const errorData = error.response.data;

            // Check if the error contains a nested object with error messages
            let errorMessage = "";
            if (errorData.error) {
                // If errorData.error is an object, handle it properly
                if (errorData.error.new_password) {
                    // Handle specific new_password errors and join them
                    errorMessage = errorData.error.new_password.join(" ");
                } else {
                    errorMessage = Object.values(errorData.error)
                        .flat()
                        .join("");
                }
            } else {
                errorMessage = errorData?.error || "Something went wrong.";
            }

            // Ensure we throw the error message as a string
            throw new Error(String(errorMessage));
        } else {
            // If there is no response from the server
            throw new Error("No response from server.");
        }
    }
};

export const changeEmail = async (email) => {
    try {
        const response = await fetchAPI.post("user/change_email/", { email });

        if (response.data && response.data.detail) {
            return { success: true, message: response.data.detail };
        } else {
            return { success: false, message: "Unexpected response from server." };
        }
    } catch (error) {
        if (error.response) {
            return { success: false, message: error.response.data.error || "Failed to update email." };
        } else if (error.request) {
            return { success: false, message: "Network error, please try again later." };
        } else {
            return { success: false, message: "An unexpected error occurred. Please try again." };
        }
    }
};

// Logout function
export const logout = async () => {
    try {
        await fetchAPI.post('user/logout/');
        console.log("Logged out successfully");
    } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
    }
};

// Refresh token if access token expires
export const refreshToken = async () => {
    try {
        const response = await fetchAPI.post('token/refresh/');
        return response.data.access;
    } catch (error) {
        console.error("Refresh token invalid or expired:", error.response?.data || error.message);
        await logout();
        throw "Session expired. Please login again.";
    }
};

export const initializeAuth = async (setAuth) => {
    try {
        const newAccessToken = await refreshToken();
        if (newAccessToken) {
            console.log('New access token obtained on init');
            setAuth({ userAllowedToLogin: true });
        }
    } catch (error) {
        console.error("No valid session found or refresh failed.");
        setAuth({ userAllowedToLogin: false });
    }
};
//
// // API call with token auto-refresh
// export const fetchWithAuth = async (url, method = "GET", data = null) => {
//     try {
//         let token = localStorage.getItem("access");
//         const headers = { Authorization: `Bearer ${token}` };
//
//         let response = await axios({ url: `${API_URL}${url}`, method, data, headers });
//         return response.data;
//     } catch (error) {
//         if (error.response?.status === 401) {
//             const token = await refreshToken(); // Try refreshing token
//             const headers = { Authorization: `Bearer ${token}` };
//             const response = await axios({ url: `${API_URL}${url}`, method, data, headers });
//             return response.data;
//         }
//         throw error.response?.data?.detail || "Request failed.";
//     }
// };

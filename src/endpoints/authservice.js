import fetchAPI from "../config files/api";

export const registerUser = async (username, email, password) => {
    try {
        const response = await fetchAPI.post('user/register/', { username, email, password });

        if (!response.ok) {
            const errorData = await response.json();
            let errorMessages = {};

            // Iterate over all keys in the error response and join multiple errors
            Object.keys(errorData).forEach((field) => {
                errorMessages[field] = errorData[field].join(" ");
            });

            throw errorMessages; // Throw the error object directly
        }

        return { success: true, message: "Registration successful!" };
    } catch (error) {
        throw error; // Ensure the error is properly thrown with its object structure
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
        console.log(response)
        return response.data.access;
    } catch (error) {
        logout(); // Logout if refresh token fails
        throw "Session expired. Please login again.";
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

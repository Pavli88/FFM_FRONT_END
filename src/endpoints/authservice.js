import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL;

export const registerUser = async (username, email, password) => {
    try {
        const response = await fetch(`${API_URL}user/register/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            let errorMessages = {};

            // Iterate over all keys in the error response
            Object.keys(errorData).forEach((field) => {
                errorMessages[field] = errorData[field].join(" "); // Join multiple errors
            });

            throw errorMessages; // Throw object instead of single string
        }

        return { success: true, message: "Registration successful!" };
    } catch (error) {
        throw error; // Throw the error object
    }
};


// Login function
export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}user/login/`, { username, password });
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        return response.data;
    } catch (error) {
        let message = "Login failed";
        if (error.response && error.response.data) {
            message = error.response.data.detail || "Something went wrong";
        }
        throw message;
    }
};

//Forgot password function
export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${API_URL}user/forgot_password/`, { email });
        return response.data.detail;
    } catch (error) {
        throw error.response?.data?.detail || "Failed to send password reset email";
    }
};

//Change password function
export const changePassword = async (oldPassword, newPassword, token) => {
    try {
        const response = await axios.post(
            `${API_URL}user/change_password/`,
            {old_password: oldPassword, new_password: newPassword},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // ✅ Invalidate tokens & force logout
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

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
        const refreshToken = localStorage.getItem("refresh"); // Get refresh token

        if (!refreshToken) {
            console.error("No refresh token found!");
            return;
        }

        await axios.post(`${API_URL}user/logout/`, { refresh_token: refreshToken }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access")}`},
        });

        // Clear tokens from local storage
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        console.log("Logged out successfully");
    } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
    }
};

// Refresh token if access token expires
export const refreshToken = async () => {
    try {
        const refresh = localStorage.getItem("refresh");
        if (!refresh) throw "No refresh token found.";

        const response = await axios.post(`${API_URL}token/refresh/`, { refresh });
        localStorage.setItem("access", response.data.access);
        return response.data.access;
    } catch (error) {
        logout(); // Logout if refresh token fails
        throw "Session expired. Please login again.";
    }
};

// API call with token auto-refresh
export const fetchWithAuth = async (url, method = "GET", data = null) => {
    try {
        let token = localStorage.getItem("access");
        const headers = { Authorization: `Bearer ${token}` };

        let response = await axios({ url: `${API_URL}${url}`, method, data, headers });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            const token = await refreshToken(); // Try refreshing token
            const headers = { Authorization: `Bearer ${token}` };
            const response = await axios({ url: `${API_URL}${url}`, method, data, headers });
            return response.data;
        }
        throw error.response?.data?.detail || "Request failed.";
    }
};

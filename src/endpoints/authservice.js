import axios from "axios";

const API_URL = 'http://127.0.0.0:8001' //process.env.REACT_APP_API_URL; // Set backend URL

// Login function
export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/api/token/`, { username, password });
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        return response.data;
    } catch (error) {
        throw error.response?.data?.detail || "Login failed";
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

        await axios.post(`${API_URL}/user/logout/`, { refresh_token: refreshToken }, {
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

        const response = await axios.post(`${API_URL}/api/token/refresh/`, { refresh });
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

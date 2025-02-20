import { useState, useContext } from "react";
import { login } from "../../endpoints/authservice"; // Import API function
import AuthContext from "../../context/AuthProvider";

const UserLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setAuth } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            alert("Login successful!");
            setAuth({
                userAllowedToLogin: true,
            });
            // window.location.href = "/home"; // Redirect after login
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};
export default UserLogin;
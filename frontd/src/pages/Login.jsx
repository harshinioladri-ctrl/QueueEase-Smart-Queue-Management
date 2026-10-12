import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/users/login", {
                email: email,
                password: password
            });

            console.log("Login response:", response.data);

            localStorage.setItem("user", JSON.stringify(response.data));

            if (response.data.role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/services");
            }

        } catch (error) {
            console.error("Login error:", error);

            if (!error.response) {
                setError(
                    "Unable to connect to backend server. Please verify the backend is running and the API URL is configured."
                );
            } else if (error.response.status === 401) {
                setError("Invalid email or password");
            } else {
                setError(
                    error.response?.data?.message ||
                    (typeof error.response?.data === "string"
                        ? error.response.data
                        : "Login failed. Please try again.")
                );
            }
        }
    };

    return (
        <div className="page">
            <div className="card form-card">

                <h2>QueueEase Login</h2>

                <p>Login to manage your queue</p>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

                <p>
                    Don't have an account?{" "}
                    <button
                        type="button"
                        className="link-button"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </button>
                </p>

                <div style={{ marginTop: "1rem", padding: "0.75rem", backgroundColor: "#f3f4f6", borderRadius: "6px", fontSize: "0.85rem", color: "#4b5563" }}>
                    <strong>Demo Accounts:</strong><br />
                    Admin: <code>admin@queueease.com</code> / <code>admin123</code><br />
                    Customer: <code>customer@queueease.com</code> / <code>customer123</code>
                </div>

            </div>
        </div>
    );
}

export default Login;
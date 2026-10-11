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

            setError(
                error.response?.data?.message ||
                "Invalid email or password"
            );
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

            </div>
        </div>
    );
}

export default Login;
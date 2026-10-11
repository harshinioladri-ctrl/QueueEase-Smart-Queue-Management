import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        try {
            await api.post("/users", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                role: "CUSTOMER"
            });

            setSuccess("Registration successful! You can now login.");

            setFormData({
                name: "",
                email: "",
                phone: "",
                password: ""
            });

        } catch (error) {
            console.error("Registration error:", error);

            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        }
    };

    return (
        <div className="page">
            <div className="card form-card">

                <h2>Create Account</h2>

                <p>Register for QueueEase</p>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="success">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />

                    <label>Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />

                    <button type="submit">
                        Register
                    </button>

                </form>

                <p>
                    Already have an account?{" "}
                    <button
                        type="button"
                        className="link-button"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                </p>

            </div>
        </div>
    );
}

export default Register;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminUsers() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("CUSTOMER");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Load users
    const loadUsers = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/users");

            setUsers(response.data);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data ||
                "Unable to load users."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    // Clear form
    const clearForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setRole("CUSTOMER");
        setEditingId(null);
    };

    // Add / Update user
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        if (!name.trim()) {
            setError("Name is required.");
            return;
        }

        if (!email.trim()) {
            setError("Email is required.");
            return;
        }

        if (!editingId && !password.trim()) {
            setError("Password is required.");
            return;
        }

        try {
            const userData = {
                name: name.trim(),
                email: email.trim(),
                password: password,
                phone: phone.trim(),
                role: role
            };

            if (editingId) {
                await api.put(
                    `/users/${editingId}`,
                    userData
                );

                setMessage(
                    "User updated successfully."
                );
            } else {
                await api.post(
                    "/users",
                    userData
                );

                setMessage(
                    "User created successfully."
                );
            }

            clearForm();
            await loadUsers();

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data ||
                "Unable to save user."
            );
        }
    };

    // Edit user
    const handleEdit = (user) => {
        setEditingId(user.id);

        setName(user.name || "");
        setEmail(user.email || "");
        setPassword(user.password || "");
        setPhone(user.phone || "");
        setRole(user.role || "CUSTOMER");

        setError("");
        setMessage("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Delete user
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setMessage("");

            await api.delete(`/users/${id}`);

            setMessage(
                "User deleted successfully."
            );

            await loadUsers();

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data ||
                "Unable to delete user."
            );
        }
    };

    if (loading) {
        return (
            <div className="page">
                <div className="container">
                    <h1>Manage Users</h1>
                    <p>Loading users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="container">

                {/* HEADER */}

                <div className="admin-header">
                    <div>
                        <h1>Manage Users</h1>
                        <p>
                            Manage QueueEase customers
                            and administrators
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            navigate("/admin")
                        }
                    >
                        ← Admin Dashboard
                    </button>
                </div>

                {/* MESSAGES */}

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="success">
                        {message}
                    </div>
                )}

                {/* USER FORM */}

                <div className="card">
                    <h2>
                        {editingId
                            ? "Edit User"
                            : "Add New User"}
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>
                                Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter name"
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter email"
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                placeholder={
                                    editingId
                                        ? "Enter password"
                                        : "Enter password"
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Phone
                            </label>

                            <input
                                type="text"
                                value={phone}
                                onChange={(e) =>
                                    setPhone(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter phone number"
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Role
                            </label>

                            <select
                                value={role}
                                onChange={(e) =>
                                    setRole(
                                        e.target.value
                                    )
                                }
                            >
                                <option value="CUSTOMER">
                                    CUSTOMER
                                </option>

                                <option value="ADMIN">
                                    ADMIN
                                </option>
                            </select>
                        </div>

                        <button type="submit">
                            {editingId
                                ? "Update User"
                                : "Add User"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={clearForm}
                            >
                                Cancel Edit
                            </button>
                        )}

                    </form>
                </div>

                {/* USER LIST */}

                <div className="card">
                    <h2>All Users</h2>

                    {users.length === 0 ? (
                        <p>
                            No users found.
                        </p>
                    ) : (
                        <div className="grid">

                            {users.map((user) => (
                                <div
                                    className="card"
                                    key={user.id}
                                >

                                    <h2>
                                        {user.name}
                                    </h2>

                                    <p>
                                        <strong>
                                            ID:
                                        </strong>{" "}
                                        {user.id}
                                    </p>

                                    <p>
                                        <strong>
                                            Email:
                                        </strong>{" "}
                                        {user.email}
                                    </p>

                                    <p>
                                        <strong>
                                            Phone:
                                        </strong>{" "}
                                        {user.phone ||
                                            "Not available"}
                                    </p>

                                    <p>
                                        <strong>
                                            Role:
                                        </strong>{" "}
                                        {user.role ||
                                            "CUSTOMER"}
                                    </p>

                                    <div>
                                        <button
                                            onClick={() =>
                                                handleEdit(
                                                    user
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    user.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>

                                </div>
                            ))}

                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default AdminUsers;
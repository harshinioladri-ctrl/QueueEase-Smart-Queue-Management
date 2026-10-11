import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminServices() {
    const navigate = useNavigate();

    const [services, setServices] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [averageServiceTime, setAverageServiceTime] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Load services
    const loadServices = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/services");

            setServices(response.data);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data ||
                "Unable to load services."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadServices();
    }, []);

    // Clear form
    const clearForm = () => {
        setName("");
        setDescription("");
        setAverageServiceTime("");
        setEditingId(null);
    };

    // Create or update service
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        if (!name.trim()) {
            setError("Service name is required.");
            return;
        }

        if (!averageServiceTime) {
            setError("Average service time is required.");
            return;
        }

        const serviceData = {
            name: name.trim(),
            description: description.trim(),
            averageServiceTime: Number(
                averageServiceTime
            ),
            active: true
        };

        try {
            if (editingId) {
                await api.put(
                    `/services/${editingId}`,
                    serviceData
                );

                setMessage(
                    "Service updated successfully."
                );
            } else {
                await api.post(
                    "/services",
                    serviceData
                );

                setMessage(
                    "Service created successfully."
                );
            }

            clearForm();
            await loadServices();

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data ||
                "Unable to save service."
            );
        }
    };

    // Edit service
    const handleEdit = (service) => {
        setEditingId(service.id);
        setName(service.name || "");
        setDescription(
            service.description || ""
        );

        setAverageServiceTime(
            service.averageServiceTime ??
            service.averageTime ??
            ""
        );

        setMessage("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Delete service
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this service?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setMessage("");

            await api.delete(
                `/services/${id}`
            );

            setMessage(
                "Service deleted successfully."
            );

            await loadServices();

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data ||
                "Unable to delete service."
            );
        }
    };

    // Toggle active status
    const handleToggleActive = async (service) => {
        try {
            setError("");
            setMessage("");

            const updatedService = {
                name: service.name,
                description: service.description,
                active: !service.active,
                averageServiceTime:
                    service.averageServiceTime,
                averageTime:
                    service.averageTime
            };

            await api.put(
                `/services/${service.id}`,
                updatedService
            );

            setMessage(
                `Service ${
                    service.active
                        ? "deactivated"
                        : "activated"
                } successfully.`
            );

            await loadServices();

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data ||
                "Unable to update service."
            );
        }
    };

    if (loading) {
        return (
            <div className="page">
                <div className="container">
                    <h1>Manage Services</h1>
                    <p>Loading services...</p>
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
                        <h1>Manage Services</h1>
                        <p>
                            Create and manage QueueEase
                            services
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

                {/* SERVICE FORM */}

                <div className="card">
                    <h2>
                        {editingId
                            ? "Edit Service"
                            : "Add New Service"}
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                    >

                        <div className="form-group">
                            <label>
                                Service Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                placeholder="Example: Doctor Consultation"
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Description
                            </label>

                            <textarea
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter service description"
                                rows="4"
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Average Service Time
                                (minutes)
                            </label>

                            <input
                                type="number"
                                min="1"
                                value={
                                    averageServiceTime
                                }
                                onChange={(e) =>
                                    setAverageServiceTime(
                                        e.target.value
                                    )
                                }
                                placeholder="Example: 15"
                            />
                        </div>

                        <button type="submit">
                            {editingId
                                ? "Update Service"
                                : "Add Service"}
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

                {/* SERVICE LIST */}

                <div className="card">
                    <h2>All Services</h2>

                    {services.length === 0 ? (
                        <p>
                            No services found.
                        </p>
                    ) : (
                        <div className="grid">

                            {services.map(
                                (service) => (
                                    <div
                                        className="card"
                                        key={service.id}
                                    >

                                        <h2>
                                            {service.name}
                                        </h2>

                                        <p>
                                            {service.description ||
                                                "No description"}
                                        </p>

                                        <p>
                                            <strong>
                                                Average Time:
                                            </strong>{" "}
                                            {service.averageServiceTime ??
                                                service.averageTime ??
                                                "Not available"}{" "}
                                            minutes
                                        </p>

                                        <p>
                                            <strong>
                                                Status:
                                            </strong>{" "}
                                            {service.active
                                                ? "ACTIVE"
                                                : "INACTIVE"}
                                        </p>

                                        <div>
                                            <button
                                                onClick={() =>
                                                    handleEdit(
                                                        service
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleToggleActive(
                                                        service
                                                    )
                                                }
                                            >
                                                {service.active
                                                    ? "Deactivate"
                                                    : "Activate"}
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        service.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>

                                    </div>
                                )
                            )}

                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default AdminServices;
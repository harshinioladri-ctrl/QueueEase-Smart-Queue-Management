import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {
    const navigate = useNavigate();

    const [queue, setQueue] = useState([]);
    const [nextCustomer, setNextCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadQueue = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/queue");

            setQueue(response.data);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data ||
                "Unable to load queue."
            );
        } finally {
            setLoading(false);
        }
    };

    const loadNextCustomer = async () => {
        try {
            const response = await api.get("/queue/next");

            setNextCustomer(response.data);
        } catch (err) {
            console.error(err);

            setNextCustomer(null);
        }
    };

    useEffect(() => {
        loadQueue();
        loadNextCustomer();
    }, []);

    const completeCustomer = async (id) => {
        try {
            await api.put(`/queue/complete/${id}`);

            await loadQueue();
            await loadNextCustomer();
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data ||
                "Unable to complete queue entry."
            );
        }
    };

    const cancelCustomer = async (id) => {
        try {
            await api.put(`/queue/cancel/${id}`);

            await loadQueue();
            await loadNextCustomer();
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data ||
                "Unable to cancel queue entry."
            );
        }
    };

    if (loading) {
        return (
            <div className="page">
                <div className="container">
                    <h1>Admin Dashboard</h1>
                    <p>Loading queue...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="container">

                <div className="admin-header">
                    <div>
                        <h1>Admin Dashboard</h1>
                        <p>Manage customer queues</p>
                    </div>

                    <div>
                        <button
                            onClick={() =>
                                navigate("/admin/services")
                            }
                        >
                            Manage Services
                        </button>

                        <button
                            onClick={() =>
                                navigate("/admin/users")
                            }
                        >
                            Manage Users
                        </button>
                    </div>
                </div>

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                {/* NEXT CUSTOMER */}

                <div className="card">
                    <h2>Next Customer</h2>

                    {nextCustomer ? (
                        <>
                            <div className="queue-number">
                                {nextCustomer.tokenNumber}
                            </div>

                            <p>
                                <strong>
                                    Customer:
                                </strong>{" "}
                                {nextCustomer.user?.name ||
                                    nextCustomer.customerName ||
                                    "Unknown"}
                            </p>

                            <p>
                                <strong>
                                    Status:
                                </strong>{" "}
                                {nextCustomer.status}
                            </p>

                            <p>
                                <strong>
                                    Priority:
                                </strong>{" "}
                                {nextCustomer.priority ?? 0}
                            </p>

                            <button
                                onClick={() =>
                                    completeCustomer(
                                        nextCustomer.id
                                    )
                                }
                            >
                                Complete Customer
                            </button>

                            <button
                                onClick={() =>
                                    cancelCustomer(
                                        nextCustomer.id
                                    )
                                }
                            >
                                Cancel Customer
                            </button>
                        </>
                    ) : (
                        <p>
                            No waiting customers.
                        </p>
                    )}
                </div>

                {/* ALL QUEUE */}

                <div className="card">
                    <h2>All Queue Entries</h2>

                    {queue.length === 0 ? (
                        <p>No queue entries found.</p>
                    ) : (
                        <div className="grid">

                            {queue.map((entry) => (
                                <div
                                    className="card"
                                    key={entry.id}
                                >
                                    <h3>
                                        {entry.tokenNumber ||
                                            "No Token"}
                                    </h3>

                                    <p>
                                        <strong>
                                            Customer:
                                        </strong>{" "}
                                        {entry.user?.name ||
                                            entry.customerName ||
                                            "Unknown"}
                                    </p>

                                    <p>
                                        <strong>
                                            Service:
                                        </strong>{" "}
                                        {entry.service?.name ||
                                            "Unknown"}
                                    </p>

                                    <p>
                                        <strong>
                                            Status:
                                        </strong>{" "}
                                        {entry.status}
                                    </p>

                                    <p>
                                        <strong>
                                            Priority:
                                        </strong>{" "}
                                        {entry.priority ?? 0}
                                    </p>

                                    {entry.status ===
                                        "WAITING" && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    completeCustomer(
                                                        entry.id
                                                    )
                                                }
                                            >
                                                Complete
                                            </button>

                                            <button
                                                onClick={() =>
                                                    cancelCustomer(
                                                        entry.id
                                                    )
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                </div>
                            ))}

                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default AdminDashboard;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MyQueue() {
    const navigate = useNavigate();

    const [queue, setQueue] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const loadQueue = async () => {
        try {
            setLoading(true);
            setError("");

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            if (!user || !user.id) {
                setError("Please login first.");
                return;
            }

            const response = await api.get(
                `/queue/user/${user.id}`
            );

            setQueue(response.data);

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data ||
                "Unable to load your queue."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadQueue();
    }, []);

    // Cancel queue entry
    const cancelQueue = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this queue entry?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setMessage("");

            await api.put(
                `/queue/cancel/${id}`
            );

            setMessage(
                "Queue entry cancelled successfully."
            );

            await loadQueue();

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
                    <h1>My Queue</h1>
                    <p>
                        Loading your queue...
                    </p>
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
                        <h1>My Queue</h1>

                        <p>
                            View your current queue
                            status
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            navigate("/services")
                        }
                    >
                        Get Another Token
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

                {/* QUEUE */}

                {queue.length === 0 ? (
                    <div className="card">
                        <h2>
                            No Queue Entries
                        </h2>

                        <p>
                            You currently don't
                            have any queue entries.
                        </p>

                        <button
                            onClick={() =>
                                navigate(
                                    "/services"
                                )
                            }
                        >
                            Browse Services
                        </button>
                    </div>
                ) : (
                    <div className="grid">

                        {queue.map((entry) => (
                            <div
                                className="card"
                                key={entry.id}
                            >

                                <h2>
                                    {entry.service?.name ||
                                        "Doctor Consultation"}
                                </h2>

                                <div className="queue-number">
                                    {entry.tokenNumber ||
                                        "Not assigned"}
                                </div>

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
                                        Status:
                                    </strong>{" "}
                                    {entry.status}
                                </p>

                                <p>
                                    <strong>
                                        Priority:
                                    </strong>{" "}
                                    {entry.priority ??
                                        0}
                                </p>

                                {entry.status ===
                                    "WAITING" && (
                                    <button
                                        onClick={() =>
                                            cancelQueue(
                                                entry.id
                                            )
                                        }
                                    >
                                        Cancel Queue
                                    </button>
                                )}

                                {entry.status ===
                                    "CANCELLED" && (
                                    <p>
                                        <strong>
                                            Queue cancelled
                                        </strong>
                                    </p>
                                )}

                                {entry.status ===
                                    "COMPLETED" && (
                                    <p>
                                        <strong>
                                            Service completed
                                        </strong>
                                    </p>
                                )}

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
}

export default MyQueue;
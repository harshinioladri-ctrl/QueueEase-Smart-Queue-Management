import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";

function GetToken() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState("");

    const serviceId = searchParams.get("serviceId");

    useEffect(() => {
        const loadService = async () => {
            try {
                if (!serviceId) {
                    setError("No service selected.");
                    return;
                }

                const response = await api.get(`/services/${serviceId}`);
                setService(response.data);
            } catch (err) {
                console.error(err);
                setError("Unable to load service.");
            } finally {
                setLoading(false);
            }
        };

        loadService();
    }, [serviceId]);

    const generateToken = async () => {
        try {
            setGenerating(true);
            setError("");

            const user = JSON.parse(localStorage.getItem("user"));

            if (!user || !user.id) {
                setError("Please login first.");
                return;
            }

            const queueEntry = {
                customerName: user.name,
                status: "WAITING",
                tokenNumber: null,
                priority: 0,
                joinedAt: new Date().toISOString(),
                servedAt: null,

                service: {
                    id: Number(serviceId)
                },

                user: {
                    id: Number(user.id)
                }
            };

            const response = await api.post(
                "/queue/token",
                queueEntry
            );

            console.log("Token created:", response.data);

            alert(
                `Token generated successfully!\nToken: ${
                    response.data.tokenNumber || "Waiting for token number"
                }`
            );

            navigate("/my-queue");

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data ||
                "Unable to generate token."
            );
        } finally {
            setGenerating(false);
        }
    };

    if (loading) {
        return (
            <div className="page">
                <div className="container">
                    <h2>Loading service...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="container">

                <button onClick={() => navigate("/services")}>
                    ← Back to Services
                </button>

                <div className="card">
                    <h1>Get Token</h1>

                    {error && (
                        <p className="error">
                            {error}
                        </p>
                    )}

                    {service && (
                        <>
                            <h2>{service.name}</h2>

                            <p>
                                {service.description}
                            </p>

                            <p>
                                <strong>
                                    Average Service Time:
                                </strong>{" "}
                                {service.averageServiceTime ?? "Not available"} minutes
                            </p>

                            <button
                                onClick={generateToken}
                                disabled={generating}
                            >
                                {generating
                                    ? "Generating..."
                                    : "Generate Token"}
                            </button>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}

export default GetToken;
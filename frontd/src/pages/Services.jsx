import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Services() {
    const navigate = useNavigate();

    const [services, setServices] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        try {
            const response = await api.get("/services");

            setServices(response.data);

        } catch (error) {
            console.error(error);
            setError("Unable to load services");
        }
    };

    return (
        <div className="page">

            <div className="container">

                <div className="navbar">

                    <h2>QueueEase</h2>

                    <div className="navbar-links">
                        <button
                            onClick={() => navigate("/services")}
                        >
                            Services
                        </button>

                        <button
                            onClick={() => navigate("/my-queue")}
                        >
                            My Queue
                        </button>

                        <button
                            className="btn-danger"
                            onClick={() => {
                                localStorage.removeItem("user");
                                navigate("/login");
                            }}
                        >
                            Logout
                        </button>
                    </div>

                </div>

                <h1>Available Services</h1>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                <div className="grid">

                    {services.length === 0 ? (

                        <div className="card">
                            <p>No services available.</p>
                        </div>

                    ) : (

                        services.map((service) => (

                            <div
                                className="service-card"
                                key={service.id}
                            >

                                <h3>
                                    {service.name}
                                </h3>

                                <p>
                                    {service.description}
                                </p>

                                <p>
                                    <strong>
                                        Average Time:
                                    </strong>{" "}
                                    {service.averageTime ?? 0} minutes
                                </p>

                                <p>
                                    <strong>
                                        Status:
                                    </strong>{" "}
                                    {service.active
                                        ? "Active"
                                        : "Inactive"}
                                </p>

                                {service.active && (
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/get-token?serviceId=${service.id}`
                                            )
                                        }
                                    >
                                        Get Token
                                    </button>
                                )}

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>
    );
}

export default Services;
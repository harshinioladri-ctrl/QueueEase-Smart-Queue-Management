import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <div className="dashboard-page">

            <nav className="navbar">

                <h2>QueueEase</h2>

                <div className="nav-buttons">

                    <button
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={() =>
                            navigate("/services")
                        }
                    >
                        Services
                    </button>

                    <button
                        onClick={() =>
                            navigate("/my-queue")
                        }
                    >
                        My Queue
                    </button>

                    <button
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </nav>

            <main className="dashboard-content">

                <h1>
                    Welcome to QueueEase
                </h1>

                <p>
                    Smart Queue Management System
                </p>

                {user && (
                    <div className="user-info">

                        <h3>
                            Welcome, {user.name}
                        </h3>

                        <p>
                            Email: {user.email}
                        </p>

                        <p>
                            Role: {user.role}
                        </p>

                    </div>
                )}

                <div className="dashboard-cards">

                    <div className="dashboard-card">

                        <h3>
                            Services
                        </h3>

                        <p>
                            View available services
                            and join a queue.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/services")
                            }
                        >
                            View Services
                        </button>

                    </div>

                    <div className="dashboard-card">

                        <h3>
                            My Queue
                        </h3>

                        <p>
                            Check your current
                            queue status.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/my-queue")
                            }
                        >
                            View My Queue
                        </button>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Dashboard;
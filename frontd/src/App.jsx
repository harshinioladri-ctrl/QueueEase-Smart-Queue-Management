import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import GetToken from "./pages/GetToken";
import MyQueue from "./pages/MyQueue";
import AdminDashboard from "./pages/AdminDashboard";
import AdminServices from "./pages/AdminServices";
import AdminUsers from "./pages/AdminUsers";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/services" element={<Services />} />

                <Route path="/get-token" element={<GetToken />} />

                <Route path="/my-queue" element={<MyQueue />} />

                <Route path="/admin" element={<AdminDashboard />} />

                <Route
                    path="/admin/services"
                    element={<AdminServices />}
                />

                <Route
                    path="/admin/users"
                    element={<AdminUsers />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
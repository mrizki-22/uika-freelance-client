import React from "react";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Services from "./pages/Services";
import Service from "./pages/Service";
import Login from "./pages/freelancer/Login";
import Signup from "./pages/freelancer/Signup";
import Verification from "./pages/freelancer/Verification";
import Dashboard from "./pages/freelancer/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDetail from "./pages/admin/UserDetail";

function App() {
  document.body.style.backgroundColor = "#ECEEF1";
  document.title = "UIKA Freelance Marketplace";
  return (
    <div className="font-roboto">
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service/:id" element={<Service />} />
          <Route path="/profile/:id" element={<Profile />} />

          <Route path="/freelancer">
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="verification" element={<Verification />} />
            <Route path="services" element={<Dashboard />} />
            <Route path="profile" element={<Dashboard />} />
            <Route path="add-service" element={<Dashboard />} />
            <Route path="edit-service" element={<Dashboard />} />
          </Route>

          <Route path="/admin">
            <Route path="login" element={<AdminLogin />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="user-detail/:id" element={<UserDetail />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </div>
  );
}

export default App;

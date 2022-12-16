import React from "react";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/freelancer/Login";
import Signup from "./pages/freelancer/Signup";
import Verification from "./pages/freelancer/Verification";
import Dashboard from "./pages/freelancer/Dashboard";

function App() {
  return (
    <div className="font-roboto bg-[#ECEEF1]">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/freelancer">
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="verification" element={<Verification />} />
            <Route path="services" element={<Dashboard />} />
            <Route path="profile" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </div>
  );
}

export default App;

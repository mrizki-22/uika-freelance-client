import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
import Sidebar from "../../components/Sidebar";
import AddService from "../../components/AddService";
import InfoIcon from "@mui/icons-material/Info";
import Services from "./Services";
import EditService from "../../components/EditService";
import EditProfile from "../../components/EditProfile";

const greetings = (name) => {
  const date = new Date();
  const hours = date.getHours();
  let greet;
  if (hours >= 5 && hours < 12) {
    greet = "Selamat Pagi";
  } else if (hours >= 12 && hours < 16) {
    greet = "Selamat Siang";
  } else if (hours >= 16 && hours < 19) {
    greet = "Selamat Sore";
  } else {
    greet = "Selamat Malam";
  }
  return `Assalamualaikum\n ${greet}, ${name} :)`;
};

function Dashboard() {
  document.title = "Dashboard | Sistem Informasi Freelance Marketplace";
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  //cek token & wa verification
  useEffect(() => {
    try {
      if (!localStorage.getItem("token")) {
        navigate("/freelancer/login");
      } else {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        //check role
        const role = decoded.role;
        if (role !== "freelancer") {
          localStorage.clear();
          navigate("/freelancer/login");
        }
        const isWaVerified = decoded.isWaVerified;
        !isWaVerified && navigate("/freelancer/verification");
        setName(decoded.name);
        setIsVerified(decoded.isVerified);
      }
    } catch (err) {
      localStorage.clear();
      console.log(err);
    }
  }, []);

  return (
    <div className="flex">
      {!isVerified && (
        <div className="flex space-x-3 items-center fixed w-[350px] bg-white drop-shadow-lg z-10 right-5 top-5 p-3 rounded-md">
          <InfoIcon className="text-blue-500" />
          <p className="text-space-cadet">Akun sedang diverifikasi, silahkan login ulang saat menerima pesan whatsapp</p>
        </div>
      )}
      <div>
        <Sidebar />
      </div>
      <div className="absolute md:right-4 md:left-[288px] right-4 left-4 p-3">
        {(() => {
          switch (location.pathname) {
            case "/freelancer/dashboard":
              return (
                <div className="flex items-center justify-center h-[90vh] whitespace-pre-wrap text-center text-2xl font-light">
                  <div>{greetings(name)}</div>
                </div>
              );
            case "/freelancer/services":
              return <Services isVerified={isVerified} />;
            case "/freelancer/profile":
              return <EditProfile />;
            case "/freelancer/add-service":
              return <AddService />;
            //if case include edit-service, return AddService component
            case "/freelancer/edit-service":
              return <EditService />;
          }
        })()}
      </div>
    </div>
  );
}

export default Dashboard;

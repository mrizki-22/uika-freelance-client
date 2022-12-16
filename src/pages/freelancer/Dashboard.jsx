import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
import Sidebar from "../../components/Sidebar";

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
  const navigate = useNavigate();

  //cek token
  useEffect(() => {
    const token = localStorage.getItem("token");
    !token && navigate("/freelancer/login");
  }, []);

  //cek isWaVerified
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const isWaVerified = decoded.isWaVerified;
    !isWaVerified && navigate("/freelancer/verification");
  }, []);

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="absolute md:right-4 md:left-[288px] right-4 left-4 p-3">
        {(() => {
          switch (location.pathname) {
            case "/freelancer/dashboard":
              return (
                <div className="flex items-center justify-center h-[90vh] whitespace-pre-wrap text-center text-2xl font-light">
                  <div>{greetings(jwt_decode(localStorage.getItem("token")).name)}</div>
                </div>
              );
            case "/freelancer/services":
              return "Jasa";
            case "/freelancer/profile":
              return "profile";
          }
        })()}
      </div>
    </div>
  );
}

export default Dashboard;

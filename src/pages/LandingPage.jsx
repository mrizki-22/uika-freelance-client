import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.pageYOffset);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={`flex justify-between fixed text-white w-full  py-5 px-10 z-10 ${scrollPosition > 70 && "bg-white"}`}>
      <Link to="/">
        <div className="flex space-x-1 hover:text-[#DAA92E] duration-300">
          <p>UIKA</p>
          <p className="font-lobster">Freelance</p>
        </div>
      </Link>
      <div className="flex space-x-4">
        <Link to="/freelancer/login">
          <div className="bg-[#DAA92E] text-[#12481d] duration-300 py-2 px-4 font-bold rounded-md hover:scale-110">Gabung</div>
        </Link>
      </div>
    </div>
  );
}

function LandingPage() {
  document.title = "UIKA Freelance | Sistem Informasi Freelance Marketplace";
  return (
    <div className="h-screen">
      <Navbar />
      <div className="bg-gradient-to-r from-[#12481d] to-[#10421A] h-full">
        <div className="flex justify-between px-48 pt-56">
          <div className="flex flex-col mt-7">
            <div className="font-bold text-4xl text-white flex space-x-3">
              <p>UIKA</p>
              <p className="font-lobster hover:text-[#DAA92E] duration-300">Freelance</p>
            </div>
            <div className="whitespace-pre-wrap mt-5">
              <p className="text-white text-2xl font-thin">
                Temukan freelancer terbaik bersama mahasiswa <br />
                <b>Ibn Khaldun Bogor</b>
              </p>
            </div>
            <div>
              <button className="bg-[#DAA92E] text-[#12481d] font-bold px-5 py-2 rounded-lg mt-5 hover:scale-110 duration-300">
                <Link to="/services">
                  <p className="text-lg">Cari Jasa</p>
                </Link>
              </button>
            </div>
          </div>
          <div>
            <img src={logo} alt="logo" width={250} className="drop-shadow-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

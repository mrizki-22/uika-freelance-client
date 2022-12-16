import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [toogle, setToogle] = useState(false);
  const menu = [
    { name: "Layanan", link: "/freelancer/services", icon: <CategoryIcon style={{ color: "white" }} /> },
    { name: "Profil", link: "/freelancer/profile", icon: <PermIdentityIcon style={{ color: "white" }} /> },
  ];
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/freelancer/login");
  };
  return (
    <>
      <div className={`absolute z-10 top-[47vh] cursor-pointer md:hidden duration-500 ${toogle === true ? "left-[246px]" : "left-[-10px]"}`}>
        {toogle === true ? <ArrowLeftIcon onClick={() => setToogle(!toogle)} fontSize="large" /> : <ArrowRightIcon onClick={() => setToogle(!toogle)} fontSize="large" />}
      </div>
      <div className={`fixed z-[5]  md:left-[16px] top-0 md:top-4 duration-500   ${toogle === true ? "left-0" : "left-[-260px]"}`}>
        <div className="flex flex-col justify-between w-64 rounded-none md:rounded-lg p-5 h-screen md:h-[95vh] bg-police-blue">
          <div>
            {/* brand */}
            <div id="brand" className="">
              <Link to={"/freelancer/dashboard"}>
                <div className="flex items-end space-x-2 px-3 justify-center" href="/admin/dashboard">
                  <h1 className="font-bold text-2xl text-white m-0 p-0 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-600 hover:to-green-500 transition duration-500 ease-in-out">UIKA Freelance</h1>
                </div>
              </Link>
            </div>

            {/* menu */}
            <div className="flex flex-col my-12 space-y-1">
              {menu.map((item) => {
                return (
                  <Link to={item.link}>
                    <div className={`flex px-4 py-4 rounded-lg text-white space-x-4  transition duration-300 ease-in-out ${item.link.includes(location.pathname) ? "bg-aquamarine" : "hover:bg-[#95c9b9]"} `}>
                      <div>{item.icon}</div>
                      <div>{item.name}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex space-x-1 text-white">
            <div onClick={handleLogout} className="cursor-pointer">
              <LogoutIcon style={{ color: "white" }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

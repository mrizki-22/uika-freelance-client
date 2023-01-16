import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function ServiceNavbar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [, setSearchParams] = useSearchParams();
  const [input, setInput] = useState();

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.pageYOffset);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      setSearchParams({ search: e.target.value });
    }
  };

  const handleClick = () => {
    setSearchParams({ search: input });
  };

  return (
    <div className={`flex items-center justify-between fixed text-police-blue w-full py-5 px-10 z-10 bg-white drop-shadow-md`}>
      <div>
        <Link to="/services">
          <div className="flex space-x-1 hover:text-[#DAA92E] duration-300">
            <p>UIKA</p>
            <p className="font-lobster">Freelance</p>
          </div>
        </Link>
      </div>
      <div className="flex items-center">
        <TextField value={input} onChange={handleChange} hiddenLabel id="filled-hidden-label-small" placeholder="Cari Jasa" variant="outlined" size="small" sx={{ width: 650 }} onKeyDown={onEnter} />
        <div className="  cursor-pointer bg-[#E6E6E7] hover:bg-[#dededf] p-2 rounded-r-md" onClick={handleClick}>
          <SearchIcon />
        </div>
      </div>
      <div className="flex">
        <Link to="/freelancer/login">
          <div className="bg-[#DAA92E] text-police-blue duration-300 py-2 px-4 font-bold rounded-md hover:scale-110">Gabung</div>
        </Link>
      </div>
    </div>
  );
}

export default ServiceNavbar;

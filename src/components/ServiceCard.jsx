import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

//props:
// serviceName: string
// pageUrl: string
// frontImg: string
// profilePict: string
// freelancerName: string
// freelancerUrl: string
// price: string

//format harga tambah Rp dan titik
function formatPrice(price) {
  const priceString = price.toString();
  const priceLength = priceString.length;
  let priceFormatted = "";
  for (let i = 0; i < priceLength; i++) {
    if (i % 3 === 0 && i !== 0) {
      priceFormatted = "." + priceFormatted;
    }
    priceFormatted = priceString[priceLength - i - 1] + priceFormatted;
  }
  return "Rp " + priceFormatted;
}

function ServiceCard(props) {
  const [isHover, setIsHover] = useState(false);
  const mouseEnter = () => {
    setIsHover(true);
  };
  const mouseLeave = () => {
    setIsHover(false);
  };
  return (
    <div className="flex flex-col bg-white w-[300px] h-[350px] rounded-md drop-shadow-md" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <Link to={props.pageUrl}>
        <div className="w-[300px] h-[200px] flex items-center justify-center overflow-hidden border-b-2 rounded-t-md">
          <img src={props.frontImg} alt="gambar layanan" width={300} className="drop-shadow-md" />
        </div>
        <div className="p-4 h-36">
          <div className="flex flex-col justify-between h-full space-y-10">
            <div>
              <Tooltip title="Jasa desain grafis murah meriah bisa apapun" placement="bottom" enterDelay={500}>
                <p className={`line-clamp-2 duration-300 ease-in-out font-medium ${isHover ? "text-[#1DBF73]" : "text-space-cadet"} `}>{props.serviceName}</p>
              </Tooltip>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex space-x-2 items-center bg-blue w-32">
                <div className="rounded-full overflow-hidden">
                  <img src={props.profilePict} alt="profile pic" width={30} />
                </div>
                <div>
                  <Link to={props.freelancerUrl}>
                    <Tooltip title="Muhammad Rizki" placement="bottom" enterDelay={500}>
                      <p className="text-space-cadet line-clamp-1 hover:text-[#1DBF73] duration-300 text-sm">{props.freelancerName}</p>
                    </Tooltip>
                  </Link>
                </div>
              </div>
              <div>
                <p className="text-[#DAA92E] font-bold">{formatPrice(props.price)}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ServiceCard;

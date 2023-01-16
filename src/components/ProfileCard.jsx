import React from "react";
import { WhatsApp } from "@mui/icons-material";

function ProfileCard(props) {
  return (
    <div className="flex flex-col fixed top-[100px] left-[50px] bg-white border-2 rounded-sm w-[450px] text-space-cadet pt-10 pb-10 drop-shadow-sm">
      <div className="flex flex-col items-center pb-5 space-y-3 border-b-[2px] border[#DADBDD]">
        <div className="rounded-full overflow-hidden">
          <img src={`http://localhost:5000/uploads/${props.profilePict}`} alt="profile picture" width={150} />
        </div>
        <div>
          <p className="font-bold text-xl ">{props.name}</p>
        </div>
      </div>
      <div className="pt-5 flex flex-col items-center space-y-4">
        <div className=" w-80 max-h-40 text-center scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-50 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          <p>{!props.bio ? "Cari freelancer terbaik bersama mahasiswa UIKA" : props.bio}</p>
        </div>

        <div className="flex flex-col w-full px-14 space-y-2">
          <div className="flex justify-between">
            <p className="font-bold">Fakultas</p>
            <p className=" text-end">{props.faculty}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Jurusan</p>
            <p>{props.major}</p>
          </div>
        </div>
        <div className="bg-[#0CC043] rounded-md hover:scale-105 duration-200 w-9/12">
          <a href={`https://wa.me/${props.nowa}`} target="_blank" className="flex space-x-2 justify-center text-white text-lg items-center py-2">
            <WhatsApp />
            <p>Hubungi {props.name}</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProfileCard from "../components/ProfileCard";
import { Skeleton } from "@mui/material";

function Profile() {
  document.body.style.backgroundColor = "#ECEEF1";
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [services, setServices] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/freelancers/${id}`);

      setData(res.data.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/services/get-services-cards/${id}`);
      setServices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchServices();
  }, []);
  console.log(data);

  return (
    <>
      <div className="flex pt-20">
        <div className="flex space-x-2 items-center fixed top-10 left-10">
          <div className="cursor-pointer" onClick={() => navigate(-1)}>
            <ArrowBackIosIcon />
          </div>
          <div>
            <p className="font-bold pt-[1px] text-xl text-space-cadet">Profil Freelancer</p>
          </div>
        </div>
        <div>{data === null ? <Skeleton variant="rectangular" width={450} height={500} /> : <ProfileCard profilePict={data.profilePict} name={data.name} bio={data.bio} faculty={data.faculty} major={data.major} nowa={data.nowa} />}</div>
        <div className="relative left-[550px] w-[950px]">
          <p className="font-bold text-xl mb-5">Daftar Jasa</p>
          <div className="grid grid-cols-3 gap-x-2 gap-y-3">
            {services.map((service) => (
              <ServiceCard
                serviceName={service.serviceName}
                pageUrl={`/service/${service.serviceId}`}
                frontImg={`http://localhost:5000/uploads/${service.frontImg}`}
                profilePict={`http://localhost:5000/uploads/${service.profilePict}`}
                freelancerName={service.freelancerName}
                freelancerUrl={`/profile/${service.freelancerId}`}
                price={service.price}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

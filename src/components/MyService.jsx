import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import { Button, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

function MyService(props) {
  document.title = "Jasa Saya | Sistem Informasi Freelance Marketplace";
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/freelancer/add-service");
  };

  useEffect(() => {
    const getData = async () => {
      //get id in token
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const id = decoded.id;

      try {
        const res = await axios.get(`http://localhost:5000/services/get-services-cards/${id}`);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="pt-5">
      <div>
        <Button variant="contained" color="primary" disabled={!props.isVerified} onClick={handleClick}>
          Tambah Jasa
        </Button>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-y-10">
        {data.length > 0 &&
          data.map((item, index) => {
            return (
              <ServiceCard
                key={index}
                serviceName={item.serviceName}
                serviceId={item.serviceId}
                pageUrl={`/freelancer/edit-service`}
                frontImg={`http://localhost:5000/uploads/${item.frontImg}`}
                profilePict={`http://localhost:5000/uploads/${item.profilePict}`}
                freelancerName={item.freelancerName}
                freelancerUrl={"/freelancer/profile"}
                price={item.price}
              />
            );
          })}
      </div>
    </div>
  );
}

export default MyService;

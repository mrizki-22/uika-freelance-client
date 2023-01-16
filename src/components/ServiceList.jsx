import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import axios from "axios";
import { Skeleton } from "@mui/material";
import { useSearchParams } from "react-router-dom";

function ServiceList() {
  document.title = "Cari jasa | Sistem Informasi Freelance Marketplace";
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);

  //get services by category
  const getServicesByCategory = async (category) => {
    try {
      const res = await axios.get(`http://localhost:5000/services/get-services/${category}`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  //get services by search
  const getServicesBySearch = async (search) => {
    try {
      const res = await axios.get(`http://localhost:5000/services/search?s=${search}`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/services/get-services");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //watching params
  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    if (category) {
      getServicesByCategory(category);
    } else if (search) {
      getServicesBySearch(search);
    } else {
      getServices();
    }
  }, [searchParams]);

  return (
    <div className="mt-5 grid grid-cols-4 gap-y-4">
      {data ? (
        data.map((item, index) => {
          return (
            <ServiceCard
              key={index}
              serviceName={item.serviceName}
              pageUrl={`/service/${item.serviceId}`}
              frontImg={`http://localhost:5000/uploads/${item.frontImg}`}
              profilePict={`http://localhost:5000/uploads/${item.profilePict}`}
              freelancerName={item.freelancerName}
              freelancerUrl={`/profile/${item.freelancerId}`}
              price={item.price}
            />
          );
        })
      ) : (
        <Skeleton variant="rectangular" width={210} height={118} />
      )}
    </div>
  );
}

export default ServiceList;

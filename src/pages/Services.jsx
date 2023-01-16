import React from "react";

import ServiceNavbar from "../components/ServiceNavbar";
import CategoryList from "../components/CategoryList";
import ServiceList from "../components/ServiceList";

function Services() {
  return (
    <div>
      <div>
        <ServiceNavbar />
      </div>
      <div className="pt-24 px-32 pb-20">
        <CategoryList />
        <ServiceList />
      </div>
    </div>
  );
}

export default Services;

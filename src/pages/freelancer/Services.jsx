import React, { useEffect, useState } from "react";
import MyService from "../../components/MyService";

function Services(props) {
  return (
    <div>
      <MyService isVerified={props.isVerified} />
    </div>
  );
}

export default Services;

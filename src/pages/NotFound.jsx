import React from "react";
import image from "../assets/dancing.gif";

function NotFound() {
  document.title = "404 Not Found";
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="mx-auto text-center">
        <h1 className="text-4xl font-bold mx-auto">404 Not Found</h1>
        <h1 className="text-2xl font-bold mx-auto">Disini tidak ada apa-apa</h1>
        <img src={image} alt="404" className="w-full h-full" width={50} />
      </div>
    </div>
  );
}

export default NotFound;

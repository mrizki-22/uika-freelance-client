import React from "react";

function NotFound() {
  document.title = "404 Not Found";
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="mx-auto text-center">
        <h1 className="text-4xl font-bold mx-auto">404 Not Found</h1>
      </div>
    </div>
  );
}

export default NotFound;

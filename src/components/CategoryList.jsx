import React, { useEffect, useState } from "react";
import { Chip } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function RenderChip() {
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  function generateColors() {
    const hue = Math.floor(Math.random() * 360);
    const lightness = Math.random() < 0.5 ? "30%" : "70%";
    const backgroundColor = `hsl(${hue}, 50%, 50%)`;
    const textColor = lightness === "30%" ? "white" : "#1c1c1c";
    return { backgroundColor, textColor };
  }

  const colorList = [
    { backgroundColor: "#70db7b", textColor: "white" },
    { backgroundColor: "#70db7b", textColor: "white" },
    { backgroundColor: "#40db5f", textColor: "white" },
    { backgroundColor: "#40BF79", textColor: "white" },
    { backgroundColor: "#1DBF73", textColor: "white" },
    { backgroundColor: "#31bd4d", textColor: "white" },
    { backgroundColor: "#159923", textColor: "white" },
    { backgroundColor: "#068000", textColor: "white" },
    { backgroundColor: "#068028", textColor: "white" },
    { backgroundColor: "#068028", textColor: "white" },
    { backgroundColor: "#068028", textColor: "white" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (e) => {
    setSearchParams({ category: e.target.innerText });
  };

  return (
    <div className="flex space-x-2">
      {categories.map((category) => {
        const { backgroundColor, textColor } = colorList[category.id - 1];
        return searchParams.get("category") === category.name ? (
          <Chip label={category.name} variant="outlined" sx={{ borderColor: backgroundColor, color: backgroundColor, fontSize: 15, padding: 1 }} onClick={handleClick} key={category.id} />
        ) : (
          <Chip label={category.name} sx={{ backgroundColor: backgroundColor, color: textColor, fontSize: 15, padding: 1 }} onClick={handleClick} key={category.id} />
        );
      })}
    </div>
  );
}

function CategoryList() {
  return (
    <div>
      <div className="mb-3 font-bold font-lobster text-police-blue">Kategori</div>
      <div className="">
        <RenderChip />
      </div>
    </div>
  );
}

export default CategoryList;

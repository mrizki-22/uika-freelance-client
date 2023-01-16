import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import WhatsApp from "@mui/icons-material/WhatsApp";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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

function ServiceDetail() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { id } = useParams();

  function DescriptionCard() {
    return (
      <div className="bg-white drop-shadow-sm border-2 rounded-lg p-6 fixed right-32 w-[35rem] h-[40rem] text-space-cadet">
        <div className="flex flex-col h-full justify-between ">
          <div className="flex flex-col space-y-5">
            <div>
              <p className="font-bold text-2xl">{formatPrice(data.price)}</p>
            </div>
            <div className="flex flex-col space-y-3">
              <p className="font-bold text-lg">Deskripsi:</p>
              <p className="drop-shadow-sm pr-4 h-64 overflow-x-hidden scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">{data.description}</p>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex space-x-2 items-center">
              <div className="rounded-full overflow-hidden">
                <img src={`http://localhost:5000/uploads/${data.profilePict}`} alt="profile pic" width={40} />
              </div>

              <Link to={`/profile/${data.freelancerId}`}>
                <p className="hover:underline text-space-cadet text-lg font-bold">{data.freelancerName}</p>
              </Link>
            </div>
            <div className="bg-[#0CC043] rounded-md hover:scale-105 duration-200">
              <a href={`https://wa.me/${data.nowa}`} target="_blank" className="flex space-x-2 justify-center text-white text-lg items-center py-2">
                <WhatsApp />
                <p>Hubungi {data.freelancerName}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function ImageCarousel() {
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const items = data.images.split(",");

    useEffect(() => {
      function handleWindowResize() {
        setWindowSize(getWindowSize());
      }

      window.addEventListener("resize", handleWindowResize);

      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }, []);

    function getWindowSize() {
      const { innerWidth, innerHeight } = window;
      return { innerWidth, innerHeight };
    }

    function Item(props) {
      return (
        <Paper className="w-full h-full flex items-center justify-center">
          <img src={`http://localhost:5000/uploads/${props.img}`} alt="gambar" className="w-[250px] md:w-[500px]" />
        </Paper>
      );
    }

    return (
      <Carousel className="drop-shadow-xl w-[250px] md:w-[500px] " animation="slide" height={windowSize.innerWidth > 768 ? 500 : 250}>
        {items.map((item, i) => (
          <Item key={i} img={item} />
        ))}
      </Carousel>
    );
  }

  function handleBack() {
    navigate(-1);
  }

  useEffect(() => {
    async function getData() {
      const res = await axios.get(`http://localhost:5000/services/detail/${id}`);
      setData(res.data[0]);
    }

    getData();
  }, []);

  return (
    <>
      {data && (
        <div className="px-32 py-12 bg-[#ECEEF1] text-space-cadet flex justify-between">
          <div>
            <div className=" ml-[-30px]">
              <div className="flex space-x-2 items-center">
                <div className="cursor-pointer" onClick={handleBack}>
                  <ArrowBackIosIcon />
                </div>
                <div>
                  <p className="font-bold pt-[1px] text-xl">Detail Layanan</p>
                </div>
              </div>
              <div className="flex space-x-1 mt-2 ml-8">
                <p>Kategori</p>
                <NavigateNextIcon />
                <Link to={`/services?category=${data.categoryName}`}>
                  <p className="hover:underline text-green-400">{data.categoryName}</p>
                </Link>
              </div>
            </div>

            <div className="mt-10">
              <div className="flex flex-col space-y-3">
                <div>
                  <p className="font-extrabold text-2xl">{data.serviceName}</p>
                </div>
                <div className="flex space-x-2 items-center">
                  <div className="rounded-full overflow-hidden">
                    <img src={`http://localhost:5000/uploads/${data.profilePict}`} alt="profile pic" width={30} />
                  </div>

                  <Link to={`/profile/${data.freelancerId}`}>
                    <p className="hover:underline text-space-cadet">{data.freelancerName}</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <ImageCarousel />
            </div>
          </div>
          <div>
            <DescriptionCard />
          </div>
        </div>
      )}
    </>
  );
}

export default ServiceDetail;

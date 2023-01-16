import React, { useState, useEffect } from "react";
import { Button, Box, Modal } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function UserDetail() {
  //ketika params id di url diubah manual dan user sudah diverifikasi, maka akan diarahkan ke halaman dashboard admin
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const notifySuccess = (msg) => toast.success(msg);

  useEffect(() => {
    //get freelancer by id
    axios
      .get(`http://localhost:5000/freelancers/${id}`)
      .then((res) => {
        setData(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //cek apakah user sudah diverifikasi
  useEffect(() => {
    if (data && data.isVerified) {
      navigate("/admin/dashboard");
    }
  }, [data]);

  function accept() {
    const id = data.id;

    axios
      .post(`http://localhost:5000/freelancers/verify`, { id: id })
      .then((res) => {
        //check status code
        if (res.status === 200) {
          //get message from response
          notifySuccess(res.data.message);
          navigate("/admin/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const decline = () => {
    const id = data.id;

    axios
      .post(`http://localhost:5000/freelancers/decline`, { id: id })
      .then((res) => {
        //check status code
        if (res.status === 200) {
          //get message from response
          notifySuccess(res.data.message);
          navigate("/admin/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col py-10 px-14 space-y-10">
      <div>
        <p className="font-bold text-2xl text-space-cadet">Detail Pendaftar</p>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center bg-white drop-shadow-md w-[800px] p-5">
          <>
            {data && (
              <div className=" flex space-x-10 justify-center">
                <div className="flex flex-col space-y-5">
                  <div className="flex space-x-2">
                    <p className="font-bold">Nama Lengkap: </p>
                    <p className="">{data.name}</p>
                  </div>
                  <div className="flex space-x-2">
                    <p className="font-bold">NPM: </p>
                    <p className="">{data.npm}</p>
                  </div>
                  <div className="flex space-x-2">
                    <p className="font-bold">No. WA: </p>
                    <p className="">{data.nowa}</p>
                  </div>
                  <div className="flex space-x-2">
                    <p className="font-bold">Fakultas: </p>
                    <p className="">{data.faculty}</p>
                  </div>
                  <div className="flex space-x-2">
                    <p className="font-bold">Jurusan: </p>
                    <p className="">{data.major}</p>
                  </div>
                </div>

                <div className="flex flex-col space-y-5 cursor-pointer" onClick={handleOpen}>
                  <img src={`http://localhost:5000/uploads/${data.ktm}`} alt="ktm" width={400} />
                </div>
              </div>
            )}
          </>
          <div className="flex space-x-10 mx-auto mt-8">
            <Button variant="contained" color="error" onClick={decline}>
              Tolak
            </Button>
            <Button variant="contained" color="success" onClick={accept}>
              Setujui
            </Button>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box style={style}>
          <img src="http://localhost:5000/uploads/ktm.jpg" alt="ktm" width={1000} />
        </Box>
      </Modal>
    </div>
  );
}

export default UserDetail;

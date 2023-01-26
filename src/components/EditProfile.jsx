import React, { useState, useEffect } from "react";
import { TextField, Button, Modal, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  height: "500px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  m: 2,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function EditProfile() {
  document.title = "Edit Profile | Sistem Informasi Freelance Marketplace";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const id = decoded.id;
    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/freelancers/${id}`);
        setData(res.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [open]);

  const onSubmit = (data) => {
    //get id
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const id = decoded.id;

    //insert id to data
    data.id = id;
    //send data to backend
    const updateProfile = async () => {
      try {
        const res = await axios.post(`http://localhost:5000/freelancers/update-profile`, data);
        notifySuccess("Berhasil mengubah profil");
        //store res token to localstorage
        localStorage.setItem("token", res.data.token);
        navigate("/freelancer/dashboard");
      } catch (error) {
        console.log(error);
        notifyError("Gagal mengubah profil");
      }
    };
    updateProfile();
  };

  const handleChange = () => {
    setIsBtnDisabled(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <ModalEditProfilePict open={open} onClose={handleClose} />
      <div>
        <h1 className="text-3xl font-bold text-space-cadet mb-5">Profil</h1>
      </div>
      {data && (
        <div className="flex space-x-24 justify-center">
          {/* profile picture */}
          <div>
            <div className="rounded-full overflow-hidden relative" onClick={handleOpen}>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-full h-full bg-black bg-opacity-70 text-[100px] text-white opacity-0 hover:opacity-100 duration-300 cursor-pointer">
                <EditIcon fontSize="inherit" color="inherit" />
              </div>
              <img src={`http://localhost:5000/uploads/${data.profilePict}`} alt="pp" width={250} />
            </div>
          </div>
          {/* profile */}
          <div className="flex flex-col space-y-5 w-[700px]">
            <div className="flex space-x-2 justify-between items-center">
              <p className="font-bold">Nama Lengkap: </p>
              <TextField value={data.name} size="small" className="w-[500px]" disabled />
            </div>
            <div className="flex space-x-2 justify-between items-center">
              <p className="font-bold">NPM: </p>
              <TextField value={data.npm} size="small" className="w-[500px]" disabled />
            </div>
            <div className="flex space-x-2 justify-between items-center">
              <p className="font-bold">Fakultas: </p>
              <TextField value={data.faculty} size="small" className="w-[500px]" disabled />
            </div>
            <div className="flex space-x-2 justify-between items-center">
              <p className="font-bold">Jurusan: </p>
              <TextField value={data.major} size="small" className="w-[500px]" disabled />
            </div>
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex space-x-2 justify-between items-center">
                <p className="font-bold">No. WA: </p>
                <TextField
                  defaultValue={data.nowa}
                  size="small"
                  className="w-[500px]"
                  {...register("nowa", {
                    required: {
                      value: true,
                      message: "Wajib isi",
                    },
                    pattern: {
                      value: /^\d{1,13}$/,
                      message: "Format salah (maks 13 digit)",
                    },
                  })}
                  error={!!errors.nowa}
                  helperText={errors?.nowa?.message}
                  onChange={handleChange}
                />
              </div>
              <div className="flex space-x-2 justify-between">
                <p className="font-bold mt-1">Bio: </p>
                <TextField
                  defaultValue={data.bio ? data.bio : "Cari freelancer terbaik bersama mahasiswa UIKA"}
                  size="small"
                  className="w-[500px]"
                  multiline
                  rows={6}
                  {...register("bio", {
                    required: {
                      value: true,
                      message: "Wajib isi",
                    },
                  })}
                  error={!!errors.bio}
                  helperText={errors?.bio?.message}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-row-reverse">
                <Button type="submit" variant="contained" disabled={isBtnDisabled}>
                  Simpan
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ModalEditProfilePict(props) {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setFile(event.target.files[0]);
    }
  };

  function handleSave() {
    //get freelancer id from token
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const id = decoded.id;

    const formData = new FormData();
    formData.append("pp", file);
    formData.append("id", id);

    axios
      .post("http://localhost:5000/freelancers/update-profilePict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        props.onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box sx={style}>
        <div>
          {!image ? (
            <div className="flex items-center justify-center w-full">
              <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 ">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Klik untuk upload gambar</span> atau drag and drop
                  </p>
                </div>
                <input id="dropzone-file" type="file" accept="image/*" className="hidden" onChange={onImageChange} />
              </label>
            </div>
          ) : (
            <label for="file">
              <div className="rounded-full overflow-hidden relative w-[300px] h-[300px] mx-auto flex justify-center items-center">
                <input id="file" type="file" accept="image/*" className="hidden" onChange={onImageChange} />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-full h-full bg-black bg-opacity-70 text-[100px] text-white opacity-0 hover:opacity-100 duration-300 cursor-pointer">
                  <EditIcon fontSize="inherit" color="inherit" />
                </div>
                <img src={image} alt="pp" height={300} width={300} />
              </div>
            </label>
          )}
          {/* button if image exist */}
          {image && (
            <div className="flex justify-center items-center space-x-2 mt-5">
              <Button variant="contained" color="primary" onClick={handleSave}>
                Simpan
              </Button>
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
}

export default EditProfile;

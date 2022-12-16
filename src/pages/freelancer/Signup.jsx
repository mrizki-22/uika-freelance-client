import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  document.title = "Daftar | Sistem Informasi Freelance Marketplace";
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [majors, setMajors] = useState([]);
  const [facultyId, setFacultyId] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const notify = (message) => toast.info(message);

  const handleFacultyChange = (event, newValue) => {
    setFacultyId(newValue.id);
    setValue("faculty", newValue.name);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("npm", data.npm);
    formData.append("nowa", data.nowa);
    formData.append("password", data.password);
    formData.append("faculty", data.faculty);
    formData.append("major", data.major);
    formData.append("ktm", data.file[0]);

    try {
      const res = await axios.post("http://localhost:5000/freelancers/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      //check status code
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        //redirect ke verifikasi nowa
        navigate("/freelancer/verification");
      }
    } catch (error) {
      notify(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    register("faculty", { required: true });
    register("major", { required: true });
  }, [register]);

  useEffect(() => {
    axios.get("http://localhost:5000/faculties").then((res) => {
      setFaculties(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/faculties/${facultyId}/majors`).then((res) => {
      setMajors(res.data);
    });
  }, [facultyId]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col bg-white drop-shadow-2xl p-10">
        <h1 className="mb-5 font-bold text-center">Daftar</h1>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex space-x-10">
            <div className="flex flex-col space-y-4">
              <div>
                <TextField
                  id="name"
                  label="Nama Lengkap"
                  variant="outlined"
                  sx={{ width: 300 }}
                  {...register("name", {
                    pattern: {
                      value: /^[a-zA-Z ]+$/,
                      message: "Hanya huruf dan spasi",
                    },
                    required: {
                      value: true,
                      message: "Wajib isi",
                    },
                  })}
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                />
              </div>
              <div>
                <TextField
                  id="npm"
                  label="NPM"
                  variant="outlined"
                  sx={{ width: 300 }}
                  {...register("npm", {
                    pattern: {
                      value: /^\d{12}$/,
                      message: "12 digit angka",
                    },
                    required: {
                      value: true,
                      message: "Wajib isi",
                    },
                  })}
                  error={!!errors.npm}
                  helperText={errors?.npm?.message}
                />
              </div>
              <div>
                <TextField
                  id="nowa"
                  label="No. Whatsapp"
                  variant="outlined"
                  sx={{ width: 300 }}
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
                />
              </div>
              <div className="relative">
                <TextField
                  id="password"
                  label="Buat Password"
                  variant="outlined"
                  sx={{ width: 300 }}
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: { value: true, message: "Wajib isi" }, pattern: { value: /[^ ]{8,64}/, message: "Min. 8 Karakter" } })}
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                />
                <div className="absolute top-4 right-2 z-[1] cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className={`${errors.faculty && "border-2 border-red-500"}`}>
                <Autocomplete
                  disablePortal
                  onChange={handleFacultyChange}
                  getOptionLabel={(option) => option.name}
                  options={faculties}
                  id="fakultas"
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Fakultas" />}
                />
              </div>
              <div className={`${errors.major && "border-2 border-red-500"}`}>
                <Autocomplete
                  disablePortal
                  getOptionLabel={(option) => option.name}
                  options={majors}
                  id="jurusan"
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Jurusan (Pilih fakultas)" />}
                  onChange={(event, newValue) => {
                    setValue("major", newValue.name);
                  }}
                />
              </div>
              <div className=" flex flex-col space-y-2">
                <label htmlFor="ktm">Upload KTM </label>
                <div className={`border-2 w-[300px] ${errors.file && "border-red-500 text-red-500"} `}>
                  <input accept="image/*" id="ktm" type="file" {...register("file", { required: true })} />
                </div>
              </div>
            </div>
          </div>
          <button className="bg-police-blue hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-4" type="submit">
            Daftar
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </div>
  );
}

export default Signup;

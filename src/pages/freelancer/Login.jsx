import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const notifyInfo = (message) => toast.info(message);
  const notifyError = (message) => toast.error(message);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/freelancers/login", data);
      localStorage.setItem("token", res.data.token);
      navigate("/freelancer/dashboard");
    } catch (error) {
      if (error.response.status === 404) {
        notifyInfo(error.response.data.message);
      } else if (error.response.status === 400 || error.response.status === 401) {
        notifyError(error.response.data.message);
      }
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col bg-white drop-shadow-2xl p-10">
        <h1 className="mb-5 font-bold text-center">Login</h1>
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              id="outlined-basic"
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
          <div className="relative">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              sx={{ width: 300 }}
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: {
                  value: true,
                  message: "Wajib isi",
                },
              })}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
            <div className="absolute top-4 right-2 z-[1] cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </div>
          </div>
          <button className="bg-police-blue hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-4">Login</button>
        </form>
        <div className="mx-auto my-2">Atau</div>
        <div>
          <Link to="/freelancer/signup">
            <button className="bg-white hover:bg-slate-100 text-police-blue border-2 border-police-blue font-bold py-2 px-4 rounded  w-full">Daftar</button>
          </Link>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </div>
  );
}

export default Login;

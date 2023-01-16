import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Verification() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [nowa, setNowa] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const id = decoded.id;
    data = { ...data, id };
    try {
      const res = await axios.post("http://localhost:5000/freelancers/check-otp", data);
      localStorage.setItem("token", res.data.token);
      notifySuccess(res.data.message);
      navigate("/freelancer/dashboard");
    } catch (error) {
      notifyError(error.response.data.message);
    }
  };

  const resendBtn = async () => {
    setIsDisabled(true);
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const id = decoded.id;
    try {
      const res = await axios.post("http://localhost:5000/freelancers/resend-otp", { id });
      notifySuccess(res.data.message);
    } catch (error) {
      notifyError(error.response.data.message);
    }
    setCountdown(30);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(countdown - 1);
      if (countdown === 0) {
        clearInterval(interval);
        setIsDisabled(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  //cek apakah token ada di localstorage & apakah sudah verifikasi wa
  useEffect(() => {
    try {
      if (!localStorage.getItem("token")) {
        navigate("/freelancer/login");
      } else {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        const isWaVerified = decoded.isWaVerified;
        isWaVerified && navigate("/freelancer/dashboard");
        setNowa(decoded.nowa);
      }
    } catch (err) {
      localStorage.clear();
      console.log(err);
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col bg-white drop-shadow-2xl p-10">
        <h1 className="mb-3 font-bold text-center">Verifikasi No. Whatsapp</h1>
        <p className="mb-5 text-center text-sm">{`Masukkan kode OTP yang dikirim ke ${nowa}`}</p>
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              id="outlined-basic"
              label="OTP"
              variant="outlined"
              sx={{ width: 400 }}
              {...register("otp", {
                required: {
                  value: true,
                  message: "Wajib isi",
                },
              })}
              error={!!errors.otp}
              helperText={errors?.otp?.message}
            />
          </div>
          <button className="bg-police-blue hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-4">Konfirmasi</button>
        </form>
        <div className="mx-auto mt-2 text-center">
          {isDisabled && (
            <div>
              <p className="text-sm">{`Kirim lagi dalam ${countdown} detik`}</p>
            </div>
          )}
          <button className={`border-b-2 border-black ${isDisabled ? "opacity-30" : "opacity-100"}`} onClick={resendBtn} disabled={isDisabled}>
            Kirim ulang
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verification;

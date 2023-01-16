import React, { useState, useEffect } from "react";
import { TextField, Autocomplete, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

function AddService() {
  document.title = "Tambah Jasa | Sistem Informasi Freelance Marketplace";
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState({});
  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/categories");
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    register("categoryId", { required: true });
  }, [register]);

  const onImageChange = (e) => {
    console.log("e.target.files.length", e.target.files.length);
    if (e.target.files.length > 5) {
      notifyError("Maksimal 5 gambar");
      e.target.value = null;
      console.log(e.target.value);
    }
    // if (e.target.files && e.target.files[0]) {
    //   for (let i = 0; i < e.target.files.length; i++) {
    //     setImages((prevState) => ({
    //       ...prevState,
    //       [e.target.files[i].name]: e.target.files[i],
    //     }));
    //   }
    // }
  };

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const id = decoded.id;

    data = { ...data, id: id };

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("categoryId", data.categoryId);
    formData.append("freelancerId", data.id);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("frontImg", data.frontImg[0]);

    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }

    try {
      const res = await axios.post("http://localhost:5000/services/add-service", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      //check status
      if (res.status === 201) {
        notifySuccess(res.data.message);
        navigate("/freelancer/services");
      }
    } catch (error) {
      notifyError(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="mt-3 text-space-cadet">
      <p className="text-xl font-bold">Tambah Jasa Baru</p>
      <form className="mt-10 flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Nama Jasa"
          variant="outlined"
          size="small"
          {...register("name", {
            required: {
              value: true,
              message: "Nama jasa tidak boleh kosong",
            },
            pattern: {
              value: /^.{0,128}$/,
              message: "Nama jasa maksimal 128 karakter",
            },
          })}
          error={!!errors.name}
          helperText={errors?.name?.message}
        />
        <TextField
          label="Deskripsi"
          multiline
          rows={6}
          variant="outlined"
          size="small"
          {...register("description", {
            required: {
              value: true,
              message: "Deskripsi tidak boleh kosong",
            },
          })}
          error={!!errors.descripion}
          helperText={errors?.descripion?.message}
        />
        <TextField
          label="Harga"
          variant="outlined"
          sx={{ width: 500 }}
          size="small"
          {...register("price", {
            required: {
              value: true,
              message: "Harga tidak boleh kosong",
            },
            pattern: {
              value: /^\d{1,}$/,
              message: "Harus angka",
            },
          })}
          error={!!errors.name}
          helperText={errors?.name?.message}
        />
        <Autocomplete
          disablePortal
          size="small"
          getOptionLabel={(option) => option.name}
          options={categories}
          id="kategori"
          sx={{ width: 500 }}
          renderInput={(params) => <TextField {...params} label="Pilih Kategori" />}
          onChange={(event, newValue) => {
            setValue("categoryId", newValue.id);
          }}
        />
        <div className="flex flex-col space-y-1">
          <p>Gambar depan (Gambar untuk tampilan pencarian) maks 1</p>
          <input type="file" accept="image/*" id="frontImg" className="border-2 inline w-[500px]" {...register("frontImg")} />
        </div>
        <div className="flex flex-col space-y-1 mt-5">
          <p>Gambar layanan (Portfolio) maks 5</p>
          <input onChange={onImageChange} type="file" accept="image/*" multiple id="images" className="border-2 inline w-[500px]" {...register("images", { required: true })} />
        </div>
        <div className="flex space-x-3">
          <Button variant="contained" color="primary" type="submit">
            Tambah
          </Button>
          <Button variant="outlined" color="primary" onClick={(e) => navigate("/freelancer/services")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddService;

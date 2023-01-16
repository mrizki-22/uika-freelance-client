import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Tooltip, Button } from "@mui/material";
import axios from "axios";

function AdminDashboard() {
  document.title = "Admin Dashboard | Sistem Informasi Freelance Marketplace";
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  //cek token & wa verification
  useEffect(() => {
    try {
      if (!localStorage.getItem("token")) {
        navigate("/admin/login");
      } else {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        const role = decoded.role;
        if (role !== "admin") {
          localStorage.clear();
          navigate("/admin/login");
        }
      }
    } catch (err) {
      localStorage.clear();
      console.log(err);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  //get unverified freelancer
  useEffect(() => {
    axios
      .get("http://localhost:5000/freelancers/unverified")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col py-10 px-14">
      <div>
        <p className="font-bold text-2xl text-space-cadet">Dashboard</p>
      </div>
      <div className="fixed top-5 right-5">
        <Tooltip title="Logout">
          <Button onClick={logout}>
            <ExitToAppIcon />
          </Button>
        </Tooltip>
      </div>
      <div className="mt-14 px-10">
        <h1 className="mb-3 font-bold text-xl text-space-cadet">Menunggu verifikasi: </h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nama</TableCell>
                <TableCell align="center">NPM</TableCell>
                <TableCell align="center">No. WA</TableCell>
                <TableCell align="center">Lihat Detail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((item, index) => {
                  return (
                    <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {item.name}
                      </TableCell>
                      <TableCell align="center">{item.npm}</TableCell>
                      <TableCell align="center">{item.nowa}</TableCell>
                      <TableCell align="center">
                        <Link to={`/admin/user-detail/${item.id}`}>
                          <Tooltip title="Lihat Detail">
                            <VisibilityIcon />
                          </Tooltip>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default AdminDashboard;

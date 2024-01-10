/** @format */

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import HomePage from "./pages/home";
import { useDispatch } from "react-redux";
import { functionLogin } from "./redux/slices/userSlice";
import { axiosInstance } from "./api/axios";
function App() {
  const dispatch = useDispatch();
  const keepLogin = () => {
    console.log("test");
    const id = localStorage.getItem("user");
    axiosInstance()
      .get(`/users/${id}`)
      .then((res) => {
        delete res.data.password;
        console.log(res.data);

        dispatch(functionLogin(res.data));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    keepLogin();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;

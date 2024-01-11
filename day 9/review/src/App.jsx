/** @format */

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { useDispatch } from "react-redux";
import { functionLogin } from "./redux/slices/userSlice";
import { axiosInstance } from "./api/axios";
import { routes } from "./routes/protectedPage";
function App() {
  const [isLoading, setIsLoading] = useState(true); // ini
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
      .catch((err) => console.log(err))
      .finally(() => {
        // ini
        setIsLoading(false);
      });
  };

  useEffect(() => {
    keepLogin();
  }, []);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <Routes>
          {routes.map((route, key) => {
            return <Route {...route} key={key} />;
          })}
        </Routes>
      )}
    </>
  );
}

export default App;

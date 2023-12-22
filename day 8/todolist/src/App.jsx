/** @format */

import "./App.css";
import { Routes, Route } from "react-router-dom";
import TodoListPage from "./pages/todolist";
import NavbarComponent from "./components/navbar";
import { createContext, useState, useEffect } from "react";
import LoginPage from "./pages/login";
import { useDispatch } from "react-redux";
export const ThemeContext = createContext(null);

function App() {
  const [total, setTotal] = useState(10);
  const dispatch = useDispatch();
  const keepLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user.email)
      dispatch({
        type: "login",
        payload: user,
      });
  };

  useEffect(() => {
    keepLogin();
  }, []);

  return (
    <>
      <ThemeContext.Provider value={{ total, setTotal }}>
        <NavbarComponent />
        <Routes>
          <Route path="" element={<TodoListPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </ThemeContext.Provider>
    </>
  );
}

export default App;

/** @format */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
function LoginPage() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const login = () => {
    if (user.email == "udin@mail.com" && user.password == "password") {
      dispatch({ type: "login", payload: { ...user } });
      localStorage.setItem("user", JSON.stringify(user));
    } else alert("email/password salah");
    return setUser({ email: "", password: "" });
  };

  return (
    <div className=" max-w-96 w-full bg-red-400 m-auto min-h-screen p-9 text-black flex flex-col gap-3 items-center">
      <input
        className="w-full p-2 bg-white rounded-md"
        placeholder="email"
        type="email"
        onChange={onChangeHandler}
        name="email"
        value={user.email}
      ></input>

      <input
        className="w-full p-2 bg-white rounded-md "
        placeholder="password"
        type="password"
        onChange={onChangeHandler}
        value={user.password}
        name="password"
      ></input>

      <button
        className=" bg-black text-white p-2 rounded-md  w-32"
        onClick={login}
      >
        Login
      </button>
    </div>
  );
}
export default LoginPage;

/** @format */
import axios from "axios";
import { useDispatch } from "react-redux";
import { functionLogin } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axios";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    axiosInstance()
      .get("/users", {
        params: { email, password },
      })
      .then((res) => {
        if (res.data?.length) {
          const { name } = res.data[0];

          alert("welcome " + name);
          delete res.data[0]?.password;
          dispatch(functionLogin(...res.data));

          localStorage.setItem("user", res.data[0].id);

          navigate("/");
        } else {
          alert("user not found");
        }

        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div
        className="flex justify-center items-center min-h-screen 
       text-sm p-3"
      >
        <div className="flex flex-col max-w-[440px] ">
          <h1 className=" text-3xl font-semibold">Masukan akun kamu</h1>
          <p className="  text-[#989898] text-[13px]">
            Belajar gratis di Namanyajugabelajar.io, dan memulai karir yang kamu
            cita-citata sejak dalam embrio!
          </p>

          <div className=" font-bold mt-5">Email</div>
          <input
            className=" p-3 bg-[#F3F4F6] rounded-lg "
            placeholder="chairin@mail.com"
            id="email"
            type="email"
          ></input>

          <div className=" font-bold mt-5">Password</div>
          <input
            className=" p-3 bg-[#F3F4F6] rounded-lg "
            placeholder="******"
            id="password"
            type="password"
          ></input>

          <button
            className=" rounded-lg mt-5 text-white bg-[#4F46E5] h-16"
            onClick={login}
          >
            Masuk
          </button>
        </div>
      </div>
    </>
  );
}
export default LoginPage;

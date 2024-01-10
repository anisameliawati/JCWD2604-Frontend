/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import { axiosInstance } from "../../api/axios";
function RegisterPage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    const key = e.target.id; //menampung value id dari element input
    const { value } = e.target; //menampung value dari element input
    // console.log(e.target.name, e.target.id);
    setUser((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    }); // cara 1

    // setUser({ ...user, [key]: value }); //cara kedua
  };

  //component did mount
  //component did update
  //component will unmount

  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log(user);
    if (user.email && user.password && user.name) setShow(true);
    else setShow(false);
  }, [user]);

  const mendaftar = () => {
    if (user.email && user.name && user.password) {
      axiosInstance()
        .post("/users", user)
        .then((res) => {
          console.log(res.data);
          setUser({
            name: "",
            email: "",
            password: "",
          });
          alert("register berhasil");
        })
        .catch((err) => console.log(err));
    }
  };

  // const daftar2 = async () => {
  //   try {
  //     const check = await axios.get("http://localhost:2000/users", {
  //       params: {
  //         email: user.email,
  //       },
  //     });
  //     if (check.data.length) {
  //       throw new Error("email sudah terdaftar");
  //     }

  //     await axios.post("http://localhost:2000/users", user);
  //     alert("register  berhasil");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <div
        className="flex justify-center items-center min-h-screen 
       text-sm p-3"
      >
        <div className="flex flex-col max-w-[440px] ">
          <h1 className=" text-3xl font-semibold">Bikin akun baru</h1>
          <p className="  text-[#989898] text-[13px]">
            Nggak susah kok, kamu cuma tinggal masukin beberapa data aja terus
            langsung jadi deh!
          </p>

          <div className=" font-bold mt-5">Nama Lenkgap</div>
          <input
            className=" p-3 bg-[#F3F4F6] rounded-lg "
            placeholder="chairin udin"
            onChange={inputHandler} //panggil function inputHandler otomatis kirim event
            id="name"
            value={user.name}
          ></input>

          <div className=" font-bold mt-5">Email</div>
          <input
            type="email"
            className="p-3  bg-[#F3F4F6] rounded-lg "
            placeholder="chairin@mail.com"
            onChange={inputHandler}
            id="email"
            value={user.email}
          ></input>

          <div className=" font-bold mt-5">Kata Sandi</div>
          <input
            type="password"
            placeholder="***********"
            className="p-3 bg-[#F3F4F6] rounded-lg"
            onChange={inputHandler}
            id="password"
            value={user.password}
          ></input>

          <p className=" mt-5 text-[#989898] text-[13px]">
            Dengan mendaftar berarti kamu setuju dengan Terms of Service dan
            Privacy Policy dari Namanyajugabelajar.io
          </p>

          <button
            className={` rounded-lg mt-5 text-white bg-[#4F46E5] h-16 ${
              show ? "" : "hidden"
            }`}
            onClick={mendaftar}
          >
            Mendaftar
          </button>
        </div>
      </div>
    </>
  );
}
export default RegisterPage;

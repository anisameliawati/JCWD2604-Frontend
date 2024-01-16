/** @format */

import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";

import { useEffect } from "react";
import { axiosInstance } from "../../api/axios";
import { useNavigate } from "react-router-dom";
function RegisterPage() {
  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  // const inputHandler = (e) => {
  //   const key = e.target.id; //menampung value id dari element input
  //   const { value } = e.target; //menampung value dari element input
  //   // console.log(e.target.name, e.target.id);
  //   setUser((prev) => {
  //     return {
  //       ...prev,
  //       [key]: value,
  //     };
  //   }); // cara 1

  //   // setUser({ ...user, [key]: value }); //cara kedua
  // };

  YupPassword(Yup);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email("bukan email"),
      password: Yup.string().required().min(5),
    }),
    onSubmit: () => {
      mendaftar();
    },
  });
  const nav = useNavigate();
  const mendaftar = () => {
    const user = formik.values;
    if (user.email && user.name && user.password) {
      axiosInstance()
        .post("/users", user)
        .then((res) => {
          console.log(res.data);
          formik.resetForm();
          alert("register berhasil");
          nav("/login");
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

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
            onChange={(e) => formik.setFieldValue("name", e.target.value)} //panggil function inputHandler otomatis kirim event
            id="name"
            value={formik.values.name}
          ></input>
          <div className=" my-1 text-red-500">{formik.errors.name}</div>

          <div className=" font-bold mt-5">Email</div>
          <input
            type="email"
            className="p-3  bg-[#F3F4F6] rounded-lg "
            placeholder="chairin@mail.com"
            onChange={formik.handleChange}
            id="email"
            value={formik.values.email}
          ></input>
          <div className=" my-1 text-red-500">{formik.errors.email}</div>

          <div className=" font-bold mt-5">Kata Sandi</div>
          <input
            type="password"
            placeholder="***********"
            className="p-3 bg-[#F3F4F6] rounded-lg"
            onChange={formik.handleChange}
            id="password"
            value={formik.values.password}
          ></input>
          <div className=" my-1 text-red-500">{formik.errors.password}</div>

          <p className=" mt-5 text-[#989898] text-[13px]">
            Dengan mendaftar berarti kamu setuju dengan Terms of Service dan
            Privacy Policy dari Namanyajugabelajar.io
          </p>

          <button
            className={` rounded-lg mt-5 text-white bg-[#4F46E5] h-16`}
            onClick={formik.handleSubmit}
          >
            Mendaftar
          </button>
        </div>
      </div>
    </>
  );
}
export default RegisterPage;

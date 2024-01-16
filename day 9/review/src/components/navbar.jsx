/** @format */
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { functionLogout } from "../redux/slices/userSlice";
import UserIcon from "../assets/user.svg";
function NavbarComponent() {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    console.log("test");
    dispatch(functionLogout());
  };

  return (
    <div className="flex justify-around  py-5  border-gray-400 items-center m-auto  max-w-screen-2xl w-full  sticky top-0 bg-white">
      {/* logo */}
      <Link className="font-bold text-xl" to={"/"}>
        BrandName
      </Link>

      {/* menus */}
      <div className="flex gap-4 text-sm font-semibold text-[#737373] items-center">
        <Link to="/">Home</Link>
        <Link>Shop</Link>
        <Link>About</Link>
        <Link>Blog</Link>
        <Link>Contact</Link>
      </div>

      {/* login and register */}
      {userSelector?.id ? (
        <div className="flex gap-3">
          <div>Welcome, {userSelector?.name}</div>
          <button
            className="rounded-md border-gray-500 border  px-2"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-1 text-sm text-[#23A6F0] font-semibold items-center">
          <img src={UserIcon}></img>
          <Link className="" to={"/login"}>
            Login
          </Link>
          /
          <Link className=" " to={"/register"}>
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
export default NavbarComponent;

export function NavbarAdminComponent() {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    console.log("test");
    dispatch(functionLogout());
  };

  return (
    <div className="sticky top-0">
      <div className="flex justify-around  py-5  border-gray-400 items-center m-auto  max-w-screen-2xl w-full   bg-white">
        {/* logo */}
        <Link className="font-bold text-xl" to={"/admin"}>
          Admin Dashboard
        </Link>

        {/* login and register */}
        {userSelector?.id ? (
          <div className="flex gap-3">
            <div>Welcome, {userSelector?.name}</div>
            <button
              className="rounded-md border-gray-500 border  px-2"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-1 text-sm text-[#23A6F0] font-semibold items-center">
            <img src={UserIcon}></img>
            <Link className="" to={"/login"}>
              Login
            </Link>
            /
            <Link className=" " to={"/register"}>
              Register
            </Link>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
}

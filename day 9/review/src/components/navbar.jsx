/** @format */
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { functionLogout } from "../redux/slices/userSlice";
function NavbarComponent() {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    console.log("test");
    dispatch(functionLogout());
  };

  return (
    <div className="flex justify-between p-7 pb-4 border-b-2 border-gray-400">
      {/* logo */}
      <div className="font-bold text-2xl text-red-400">Logo</div>

      {/* menus */}
      <div className="flex gap-4 font-semibold ">
        <div>Home</div>
        <div>Services</div>
        <div>Contact</div>
      </div>

      {/* login and register */}
      {userSelector?.id ? (
        <div className="flex gap-3">
          <div>Welcome, {userSelector?.name}</div>
          <div
            className=" px-2 rounded-md border-gray-500 border"
            onClick={logout}
          >
            Logout
          </div>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link
            className=" px-2 rounded-md border-gray-500 border"
            to={"/login"}
          >
            Login
          </Link>
          <Link
            className=" px-2 rounded-md border-gray-500 border"
            to={"/register"}
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
export default NavbarComponent;

/** @format */
import { useContext } from "react";
import { ThemeContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
function NavbarComponent() {
  const { total } = useContext(ThemeContext);
  const counterSelector = useSelector((state) => state.counter);
  const counterSlice = useSelector((state) => state.counter2);
  const userSelector = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: "logout" });
    localStorage.removeItem("user");
  };

  return (
    <div className="p-3 bg-purple-500 text-white sticky top-0 flex justify-between px-8">
      <b>
        <Link to={"/"}>home</Link>
      </b>
      <b>{counterSelector.value}</b>
      <b>{counterSlice.value}</b>

      <b>{total}</b>

      <b>
        {" "}
        {userSelector.email ? (
          <>
            <div className="flex gap-2">
              <div> {userSelector.email}</div>
              <button className="bg-red-500 p-3" onClick={logout}>
                {" "}
                logout
              </button>
            </div>
          </>
        ) : (
          <Link to={"/login"}> Login </Link>
        )}{" "}
      </b>
    </div>
  );
}
export default NavbarComponent;

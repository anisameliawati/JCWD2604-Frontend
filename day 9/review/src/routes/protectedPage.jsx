/** @format */

import { useEffect, useState } from "react";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import HomePage from "../pages/home";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../pages/loading";
import ProductDetail from "../pages/productDetail";
import AdminDashBoard from "../pages/admin/dashboard";

function ProtectedPage({ children, userOnly, guestOnly, adminOnly }) {
  const userSelector = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true); //ini
  const nav = useNavigate();
  useEffect(() => {
    console.log(userSelector, "ini user");
    console.log(adminOnly, userSelector.id, guestOnly);
    if (adminOnly && userSelector?.role != "admin") {
      nav("/");
    } else if (guestOnly && userSelector.id) {
      if (userSelector.role == "admin") nav("/admin");
      else nav("/");
    } else if (userOnly && !userSelector.id) {
      nav("/login");
    } else {
      //ini
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [userSelector.id, children]);
  return <>{isLoading ? <LoadingPage /> : children}</>; //ini
}
export default ProtectedPage;
class RouteClass {
  constructor(path, element, userOnly, guestOnly, adminOnly) {
    this.path = path;
    this.element = (
      <ProtectedPage
        userOnly={userOnly}
        guestOnly={guestOnly}
        adminOnly={adminOnly}
      >
        {element}
      </ProtectedPage>
    );
  }
}

export const routes = [
  new RouteClass("/", <HomePage />),
  new RouteClass("/login", <LoginPage />, false, true),
  new RouteClass("/register", <RegisterPage />, false, true),
  new RouteClass("/products/:productId", <ProductDetail />),
  new RouteClass("/admin/", <AdminDashBoard />, true, false, true),
  // new RouteClass("/admin/:id/addresses/:addressId", <AdminDashBoard />, true, false, true),
];

// guestOnly , needLogin

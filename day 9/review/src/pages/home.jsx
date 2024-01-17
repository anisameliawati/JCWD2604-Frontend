/** @format */
// import { Link } from "react-router-dom";
import NavbarComponent from "../components/navbar";
import SliderComponent from "../components/slider";
import ProductListComponent from "../components/productList";
// import { CartProvider } from "react-use-cart";

function HomePage() {
  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col justify-center max-w-screen-2xl w-full items-center m-auto">
        <SliderComponent />
        <ProductListComponent />
      </div>
    </>
  );
}
export default HomePage;

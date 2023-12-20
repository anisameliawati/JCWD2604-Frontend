/** @format */
import Search from "../assets/search.png";
import Logo from "../assets/logo.png";
import { useState } from "react";
function NavbarComponent({ setSearch }) {
  return (
    <nav>
      <div className="search">
        <span>
          <img src={Search} alt="" />
        </span>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Type any products here"
        />
      </div>
      <div className="menus">
        <div>Sneakers</div>
        <div>Apparel</div>
        <div>
          <img src={Logo} alt="logo" />
        </div>
        <div>Luxury</div>
        <div>Electronics & Collectibles</div>
      </div>
      <div id="logo">
        <img src={Logo} alt="logo" width="100%" />
      </div>

      <div className="auth">
        <div>Login</div>
        <div>Register</div>
      </div>
    </nav>
  );
}
export default NavbarComponent;

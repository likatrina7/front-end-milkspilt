import "./Header.css";
import React, { useContext } from "react";
import logo from "../media/milk_spilt_logo.png";
import { Link } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import { UserContext } from "../UserContext";
import { Search } from "@material-ui/icons";

const Header = () => {
  const user = useContext(UserContext);

  let redirectPath = "";
  if (user.id) {
    redirectPath = "/dashboard";
  } else {
    redirectPath = "/";
  }

  return (
    <header className="home-header">
      <div className="logo-area">
        <Link to={redirectPath}>
          <img src={logo} alt="Milk Spilt Logo" className="logo" />
        </Link>
        <Link to={redirectPath} className="co-name">
          Milk Spilt
        </Link>
      </div>
      <div className="search-area">
        <input
          type="text"
          class="searchTerm"
          placeholder="What are you looking for?"
        />
        <button type="submit" class="searchButton">
          <Search />
        </button>
      </div>
      <div className="login-area">{user.id ? <Logout /> : <Login />}</div>
    </header>
  );
};

export default Header;

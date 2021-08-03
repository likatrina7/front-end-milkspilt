import "./Header.css";
import React from "react";
import logo from "../media/milk_spilt_logo.png";
import { Link, useHistory } from "react-router-dom";
import Login from "./Login";

const Header = () => {
  const history = useHistory();

  const handleClickAskQ = () => {
    history.push("/askQuestion");
  };

  return (
    <header className="home-header">
      <div className="logo-area">
        <Link to="/">
          <img src={logo} alt="Milk Spilt Logo" />
        </Link>
        <Link to="/" className="co-name">
          Milk Spilt
        </Link>
      </div>
      <div className="search-area">
        <form className="search">
          <input type="text" placeholder="Search..." />
        </form>
        <button onClick={handleClickAskQ}>Ask Question</button>
      </div>
      <div className="login-area">
        <Login />
      </div>
    </header>
  );
};

export default Header;

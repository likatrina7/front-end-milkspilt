import "./Header.css";
import React, { useContext } from "react";
import logo from "../media/milk_spilt_logo.png";
import { Link, useHistory } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import { UserContext } from "../UserContext";

const Header = () => {
  const history = useHistory();

  const handleClickAskQ = () => {
    history.push("/askQuestion");
  };

  const user = useContext(UserContext);

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
      <div className="login-area">{user.id ? <Logout /> : <Login />}</div>
    </header>
  );
};

export default Header;

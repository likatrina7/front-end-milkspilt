import "./Header.css";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../media/milk_spilt_logo.png";
import { Link } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import { UserContext } from "../UserContext";
import { Search } from "@material-ui/icons";
import DarkModeToggle from "react-dark-mode-toggle";

const Header = ({ isDarkMode, setIsDarkMode }) => {
  const user = useContext(UserContext);
  const history = useHistory();
  const [searchInput, setSearchInput] = useState("");

  let redirectPath = "";
  if (user.id) {
    redirectPath = "/dashboard";
  } else {
    redirectPath = "/";
  }

  const handleSearchClick = () => {
    history.push(`/search/${searchInput}`);
  };

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
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit" class="searchButton" onClick={handleSearchClick}>
          <Search />
        </button>
      </div>
      <div className="login-area">
        <DarkModeToggle
          onChange={setIsDarkMode}
          checked={isDarkMode}
          size={50}
          className="darkmode"
        />
        {user.id ? <Logout /> : <Login />}
      </div>
    </header>
  );
};

export default Header;

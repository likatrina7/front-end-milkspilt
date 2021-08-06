import "./Footer.css";
import logo from "../media/milk_spilt_logo.png";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Footer = () => {
  const user = useContext(UserContext);

  let redirectPath = "";
  if (user.id) {
    redirectPath = "/dashboard";
  } else {
    redirectPath = "/";
  }
  return (
    <footer className="home-footer">
      <div className="footer-style">Copyright © 2021 Milk Spilt</div>
      <div className="footer-style">
        <Link to={redirectPath}>
          <img src={logo} alt="Milk Spilt Logo" className="logo" />
        </Link>
      </div>
      <div className="footer-style">
        <Link to="/about" className="link">
          About
        </Link>
        <Link to="/contact" className="link">
          Contact Us
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import "./Footer.css";
import logo from "../media/milk_spilt_logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="home-footer">
      <div className="footer-style">Copyright © 2021 Milk Spilt</div>
      <div className="footer-style">
        <Link to="/">
          <img src={logo} alt="Milk Spilt Logo" />
        </Link>
      </div>
      <div className="footer-style">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
    </footer>
  );
};

export default Footer;

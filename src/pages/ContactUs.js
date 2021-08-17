import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import "./StatPages.css";
import Header from "../components/Header.js";
import { DarkModeContext } from "../DarkModeContext";

const ContactUs = () => {
  const user = useContext(UserContext);
  const { isDarkMode } = useContext(DarkModeContext);
  const starClass = `${isDarkMode ? "star" : ""}`;

  return (
    <React.Fragment>
      <Header />
      <div className="info-body">
        <h1>Contact Us</h1>
        <h3>Email Us at customer-service@milkspilt.com</h3>
        <span className={starClass}></span>
        <span className={starClass}></span>
        <span className={starClass}></span>
        <span className={starClass}></span>
        <span className={starClass}></span>
        <span className={starClass}></span>
      </div>
    </React.Fragment>
  );
};

export default ContactUs;

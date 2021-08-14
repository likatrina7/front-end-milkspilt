import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import "./StatPages.css";
import Header from "../components/Header.js";

const ContactUs = () => {
  const user = useContext(UserContext);

  return (
    <React.Fragment>
      <Header />
      <div className="info-body">
        <h1>Contact Us</h1>
        <h3>Email Us at customer-service@milkspilt.com</h3>
      </div>
    </React.Fragment>
  );
};

export default ContactUs;

import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import "./StatPages.css";

const ContactUs = () => {
  const user = useContext(UserContext);

  return (
    <div className="info-body">
      <h1>Contact Us</h1>
      <h3>Email Us at customer-service@milkspilt.com</h3>
      <p>{user.name}</p>
    </div>
  );
};

export default ContactUs;

import React, { useContext } from "react";
import { UserContext } from "../UserContext";

const ContactUs = () => {
  const user = useContext(UserContext);

  return (
    <div>
      <h1>Contact Us</h1>
      <h3>Email Us at customer-service@milkspilt.com</h3>
      <p>{user.name}</p>
    </div>
  );
};

export default ContactUs;

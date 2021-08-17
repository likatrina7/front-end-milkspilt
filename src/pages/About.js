import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import "./StatPages.css";
import Header from "../components/Header.js";

const About = () => {
  const user = useContext(UserContext);

  return (
    <React.Fragment>
      <Header />
      <div className="info-body">
        <h1>About Milk Spilt</h1>
        <h3>
          Parents will have a lot questions they want to find answers to, or
          some experienced parents want to contribute their wisdom to young
          parents. This app dedicate to provide a platform for parents to
          ask/answer questions related to child care.
        </h3>
      </div>
    </React.Fragment>
  );
};

export default About;

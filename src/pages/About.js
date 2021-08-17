import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import "./StatPages.css";
import Header from "../components/Header.js";
import { DarkModeContext } from "../DarkModeContext";

const About = () => {
  const user = useContext(UserContext);
  const { isDarkMode } = useContext(DarkModeContext);
  const starClass = `${isDarkMode ? "star" : ""}`;

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
        <h3>
          How do you think your parenting skills stack up? Want to be a better
          parent? Join the milk spilt community of parents and see parenting in
          a new way.
        </h3>
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

export default About;

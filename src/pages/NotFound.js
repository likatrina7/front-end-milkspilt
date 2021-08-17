import React from "react";
import "./StatPages.css";
import Header from "../components/Header.js";

const NotFound = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="info-body">
        <h1>404 Not Found</h1>;
      </div>
    </React.Fragment>
  );
};

export default NotFound;

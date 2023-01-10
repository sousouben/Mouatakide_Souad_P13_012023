import React from "react";
import { Link } from "react-router-dom";
import "./error.css";
import error from "../../assets/img/error.jpg";

const Error = () => {
  return (
    <div className="error_container">
      <img src={error} alt="" />
      <Link to="/">Back to main page</Link>
    </div>
  );
};

export default Error;

import React from "react";
import "./header.css";
import logo from "../../assets/img/argentBankLogo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link to="/login" className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Header;

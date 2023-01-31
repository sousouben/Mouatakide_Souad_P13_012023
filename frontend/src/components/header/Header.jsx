import React from "react";
import "./header.css";
import logo from "../../assets/img/argentBankLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut, axiosUserData } from "../../services/actions";
import { selectUser } from "../../feature/selector";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(selectUser);
  const isRemembered = localStorage.getItem("isRemembered");

  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(signOut());
  };

  const handleSignIn = () => {
    if (isRemembered) {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      dispatch(axiosUserData(token));
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div
        onClick={userData.data ? handleSignOut : handleSignIn}
        className="main-nav-item"
      >
        <i className="fa fa-user-circle"></i>
        {userData.data ? `${userData.data.firstName} Sign Out` : `Sign In`}
      </div>
    </nav>
  );
};

export default Header;

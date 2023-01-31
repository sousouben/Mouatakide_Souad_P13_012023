import React from "react";
import "./header.css";
import logo from "../../assets/img/argentBankLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut, axiosUserData } from "../../services/actions";
import { selectUser } from "../../feature/selector";

/**
 * @function Header
 * @returns {JSX.Element} A navigation bar with logo, sign in/sign out button, and links.
 */
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(selectUser);
  const isRemembered = localStorage.getItem("isRemembered");

  /**
   * @desc Fonction pour déconnecter l'utilisateur.
   * Efface les données du localStorage et du sessionStorage.
   * Dispatch une action pour signer le utilisateur hors.
   */
  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(signOut());
  };

  /**
   * @desc Gère la procédure d'authentification de l'utilisateur. Si l'utilisateur est en mémoire,il récupère les données à partir du localStorage ou sessionStorage, sinon il est redirigé vers la page de connexion.
   */
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
        {/**Si "userData.data" existe, cela signifie que l'utilisateur est connecté, donc la fonction "handleSignOut" sera appelée. Sinon, la fonction "handleSignIn" sera appelée. */}
        <i className="fa fa-user-circle"></i>
        {userData.data ? `${userData.data.firstName} Sign Out` : `Sign In`}
        {/** il affiche soit le prénom de l'utilisateur suivi de "Sign Out" si les données d'utilisateur sont disponibles, soit simplement "Sign In" s'il n'y a pas de données d'utilisateur. */}
      </div>
    </nav>
  );
};

export default Header;

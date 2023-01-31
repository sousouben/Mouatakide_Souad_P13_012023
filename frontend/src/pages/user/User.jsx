import React, { useEffect } from "react";
import Transactions from "../../components/transactions/Transactions";
import UserName from "../../components/userName/UserName";
import "./user.css";
import { selectUser } from "../../feature/selector";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { signOut, axiosUpdateUserData } from "../../services/actions";
import { useNavigate } from "react-router-dom";

/**
 * @function User
 * Cette fonction gère l'affichage et la mise à jour des données utilisateur.
 * Si l'utilisateur n'est pas connecté, il est redirigé vers la page de connexion.
 * Si un jeton est présent dans le stockage local ou de session, les données utilisateur sont mises à jour.
 * Si aucun jeton n'est présent, le stockage local et de session sont vidés et l'utilisateur est déconnecté.
 * @return {null} - Si les données de l'utilisateur ne sont pas disponibles
 */
function User() {
  /**
   * Récupère les données d'utilisateur à partir du store
   */
  const userData = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Récupère le token d'authentification à partir du localStorage ou du sessionStorage
   */
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  /**
   * Hook useEffect qui s'exécute lorsque les dépendances sont modifiées
   */
  useEffect(() => {
    if (!userData.data) {
      /**
       * Si le token d'authentification est présent
       * Envoie une action pour mettre à jour les données d'utilisateur avec le token
       * Navigue vers la page de profil
       */
      if (token) {
        dispatch(axiosUpdateUserData(token));
        navigate("/profile");
      } else {
        /**
         * Efface les données du localStorage et du sessionStorage
         * Envoie une action pour déconnecter l'utilisateur
         * Navigue vers la page de connexion
         */
        localStorage.clear();
        sessionStorage.clear();
        dispatch(signOut());
        navigate("/login");
      }
    }
  }, [dispatch, navigate, token, userData]);
  /**
   * Si les données d'utilisateur ne sont pas présentes, renvoie null
   */
  if (!userData.data) {
    console.log(userData);
    return null;
  }

  return (
    <main className="main bg-dark">
      <UserName userData={userData} />
      <h2 className="sr-only">Accounts</h2>
      <Transactions
        accountTitle="Argent Bank Checking (x8349)"
        accountAmount="$2,082.79"
        accountBalance="Available Balance"
      />
      <Transactions
        accountTitle="Argent Bank Savings (x6712)"
        accountAmount="$10,928.42"
        accountBalance="Available Balance"
      />
      <Transactions
        accountTitle="Argent Bank Credit Card (x8349)"
        accountAmount="$184.30"
        accountBalance="Current Balance"
      />
    </main>
  );
}

export default User;

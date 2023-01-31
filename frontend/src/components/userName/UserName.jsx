import React, { useState } from "react";
import "./userName.css";
import { axiosUpdateUserData } from "../../services/actions";
import { selectUser } from "../../feature/selector";
import { useSelector, useDispatch } from "react-redux/es/exports";

/**
 * @function UserName
 * @description Composant pour afficher le nom de l'utilisateur et permettre la modification du nom.
 * @param {Object} userData - Les données de l'utilisateur.
 * @returns {JSX} Composant pour afficher le nom de l'utilisateur et permettre la modification du nom.
 */

function UserName() {
  /**
   * hook de dispatch pour mettre à jour les données de l'utilisateur
   */
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [edit, setEdit] = useState(false);
  const userData = useSelector(selectUser);

  /**
   * Récupération du jeton de l'utilisateur depuis le localStorage, sessionStorage ou les données de l'utilisateur
   */
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token") ||
    userData.token;

  /**
   * Gestionnaire d'événement soumettant les modifications du nom d'utilisateur
   * @param {Event} e - événement du formulaire
   */
  function handleSubmit(e) {
    e.preventDefault();
    /**
     * Dispatch pour mettre à jour les données de l'utilisateur
     */
    dispatch(axiosUpdateUserData(token, firstName, lastName));
    /**
     * Mettre à jour le hook de state pour ne plus afficher la forme de modification
     */
    setEdit(false);
  }

  return edit ? (
    <div className="header">
      <h1 className="">Welcome back</h1>
      <form className="formChange" onSubmit={handleSubmit}>
        <div className="divInputChange">
          <input
            className="inputChange"
            type="text"
            placeholder={userData.data.firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="inputChange"
            type="text"
            placeholder={userData.data.lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="divButtonChange">
          <button className="buttonChange" type="submit">
            Save
          </button>
          <button
            className="buttonChange"
            onClick={(e) => {
              e.preventDefault();
              setEdit(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {userData.data.firstName} {userData.data.lastName}!
      </h1>
      <button className="edit-button" onClick={() => setEdit(true)}>
        Edit Name
      </button>
    </div>
  );
}

export default UserName;

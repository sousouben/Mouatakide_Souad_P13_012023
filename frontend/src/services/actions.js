import { actions } from "../feature/reducer";
import SignIn from "../pages/sign-in/SignIn";
import { selectUser } from "../feature/selector";
import axios from "axios";

/**
 * @function
 * @description signOut est une fonction qui efface les données de stockage local et de session et déclenche une action pour réinitialiser l'état de l'utilisateur.
 * @param {function} dispatch - Une fonction qui déclenche une action vers le store.
 * @returns {function} Une fonction qui efface les données de stockage local et de session et déclenche une action pour réinitialiser l'état de l'utilisateur.
 *
 */
export function signOut() {
  return (dispatch) => {
    localStorage.clear();
    sessionStorage.clear();
  };
}

/**
 * @function
 * @param {string} token - Le jeton à stocker dans le stockage local.
 * @param {boolean} remember - Un booléen indiquant si l'utilisateur a choisi d'être mémorisé ou non.
 * @description Cette fonction est utilisée pour définir le jeton et mémoriser la valeur dans le stockage local.
 *
 */
export function setRemember(token, remember) {
  localStorage.setItem("token", token);
  localStorage.setItem("isRemembered", remember);
}

/**
 * @function
 * @async
 * @param {Object} userLogin - Un objet contenant les informations de connexion de l'utilisateur.
 * @param {string} userLogin.email - L'e-mail de l'utilisateur.
 * @param {string} userLogin.password - Le mot de passe de l'utilisateur.
 * @param {Function} dispatch - Une fonction qui distribue une action au store.
 * @param {Function} getState - Une fonction qui obtient l'état actuel du store.
 * @returns {Promise<string>} - Une promesse qui résout le jeton de l'utilisateur si la connexion réussit, ou la rejette avec un message d'erreur si elle échoue.
 *
 */
export function axiosUserToken(userLogin) {
  return async (dispatch, getState) => {
    const tokenStatus = selectUser(getState()).tokenStatus;

    if (tokenStatus === "pending" || tokenStatus === "updating") {
      return;
    }
    dispatch(actions.fetchUserTokenStart(userLogin));
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        userLogin
      );

      if (response.status === 400) {
        console.log("invalid fields");
      }
      if (response.status === 401) {
        dispatch(actions.reset());
      }

      const token = response.data.body.token;
      dispatch(actions.fetchUserTokenSuccess(token));

      return token;
    } catch (error) {
      dispatch(actions.fetchUserTokenError(error.message));
    }
  };
}

/**
 * Récupérer les données utilisateur de l'API à l'aide du jeton fourni
 * @function
 * @async
 * @param {string} token - Le jeton de l'utilisateur
 * @returns {function} - Envoie l'action fetchUserDataStart, fetchUserDataSuccess ou fetchUserDataError en fonction de la réponse de l'API.
 *
 */
export function axiosUserData(token) {
  return async (dispatch, getState) => {
    const status = selectUser(getState()).dataStatus;

    if (status === "pending" || status === "updating") {
      return;
    }
    if (status === "rejected") {
      dispatch(signOut());
      return <SignIn />;
    }

    dispatch(actions.fetchUserDataStart(token));

    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.status === 400) {
        console.log("invalid fields");
      }
      if (data.status === 401) {
        dispatch(signOut());
      }
      dispatch(actions.fetchUserDataSuccess(token, data.body));
    } catch (error) {
      dispatch(actions.fetchUserDataError(error.message));
    }
  };
}

export function axiosUpdateUserData(token, firstName, lastName) {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        { firstName, lastName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.status === 400) {
        console.log("invalid fields");
      }
      if (data.status === 401) {
        dispatch(signOut());
      }
      dispatch(actions.updateUserProfile(token, firstName, lastName));
    } catch (error) {
      dispatch(actions.fetchUserDataError(error.message));
    }
  };
}

import { createSlice } from "@reduxjs/toolkit";

/**
 * État initial de la tranche de connexion du Redux store
 * @typedef {Object} LoginState - Etat de connexion
 * @property {string} tokenStatus - Le statut actuel du jeton (vide, en attente, résolu, rejeté)
 * @property {string} dataStatus - Le statut actuel des données utilisateur (vide, en attente, résolu, rejeté)
 * @property {Object} data - Les données utilisateur, null si non chargé
 * @property {string} error - Le message d'erreur, null si aucune erreur
 * @property {string} token - Le jeton utilisateur, null si non chargé
 */
const initialState = {
  tokenStatus: "void",
  dataStatus: "void",
  data: null,
  error: null,
  token: null,
};

/**
 * @typedef {Object} LoginSlice - connexion
 * @property {Object} actions - Un objet contenant les actions pour la tranche de connexion
 * @property {Function} reducer - La fonction réducteur pour la tranche de connexion
 */
const { actions, reducer } = createSlice({
  name: "login",
  initialState,
  reducers: {
    /**
     * Créateur d'action pour définir l'état sur "en attente" lorsqu'une demande de récupération des données utilisateur est faite
     * @function
     * @param {LoginState} state - L'état actuel de la tranche de connexion
     * @returns {void}
     */
    fetchUserDataStart: (state) => {
      state.dataStatus = "pending";
      state.error = null;
    },
    /**
     * Créateur d'action pour définir l'état sur "résolu" lorsqu'une demande de récupération des données utilisateur est réussi
     * @function
     * @param {LoginState} state - L'état actuel de la tranche de connexion
     * @param {Object} action - l'objet d'action
     * @returns {void}
     */
    fetchUserDataSuccess: (state, action) => {
      state.dataStatus = "resolved";
      state.data = action.payload.data;
      state.token = action.payload.token;
    },
    /**
     * Créateur d'action pour définir l'état sur "rejeté" lorsqu'une demande de récupération des données utilisateur échoue
     * @function
     * @param {LoginState} state - L'état actuel de la tranche de connexion
     * @param {Object} action - L'objet d'action
     * @returns {void}
     */
    fetchUserDataError: (state, action) => {
      state.dataStatus = "rejected";
      state.error = action.payload;
      state.data = null;
    },
    /**
     * Créateur d'action pour définir l'état sur "en attente" lorsqu'une demande de récupération de jeton d'utilisateur est effectuée
     * @function
     * @param {LoginState} state - L'état actuel de la tranche de connexion
     * @returns {void}
     */
    fetchUserTokenStart: (state) => {
      state.tokenStatus = "pending";
      state.error = null;
    },
    /**
     * Créateur d'action pour définir l'état sur "résolu" lorsqu'une demande de récupération de jeton d'utilisateur aboutit
     * @function
     * @param {LoginState} state - L'état actuel de la tranche de connexion
     * @param {Object} action - L'objet d'action
     * @returns {void}
     */
    fetchUserTokenSuccess: (state, action) => {
      state.tokenStatus = "resolved";
      state.data = action.payload;
    },
    /**
     * Créateur d'action pour définir l'état sur "rejeté" lorsqu'une demande de récupération de jeton utilisateur échoue
     * @function
     * @param {LoginState} state - L'état actuel de la tranche de connexion
     * @param {Object} action - L'objet d'action
     * @returns {void}
     */
    fetchUserTokenError: (state, action) => {
      state.tokenStatus = "rejected";
      state.error = action.payload.message;
      state.data = null;
    },
    /**
     * Créateur d'action pour la mise à jour des données du profil utilisateur
     * @function
     * @param {LoginState} state - L'état actuel de la tranche de connexion
     * @param {Object} action - L'objet d'action contenant les nouvelles données de profil
     * @returns {void}
     */
    updateUserProfile: (state, action) => {
      state.data.firstName = action.payload.firstName;
      state.data.lastName = action.payload.lastName;
    },
    /*reset: (state) => {
      return initialState;
    },*/
  },
});

export { actions };
export default reducer;

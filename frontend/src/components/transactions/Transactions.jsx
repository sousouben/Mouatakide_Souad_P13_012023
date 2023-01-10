import React from "react";
import PropTypes from "prop-types";

/**
 * @module Transactions
 * @description Composant React permettant d'afficher les informations d'une transaction bancaire spécifique.
 * Il importe un fichier CSS pour fournir des styles pour le composant.
 */

/**
 * Props (propriétés) du composant
 * @property {string} accountTitle - Titre de la transaction.
 * @property {string} accountAmount - Montant de la transaction.
 * @property {string} accountBalance - Solde de compte après la transaction.
 */

/**
 * @function
 * @name Transactions
 * @param {Object} props - Les propriétés du composant
 * @returns {React.Component} - Composant React pour afficher les informations de la transaction.
 */

function Transactions({ accountTitle, accountAmount, accountBalance }) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{accountTitle}</h3>
        <p className="account-amount">{accountAmount}</p>
        <p className="account-amount-description">{accountBalance}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
}

Transactions.propTypes = {
  accountTitle: PropTypes.string.isRequired,
  accountAmount: PropTypes.string.isRequired,
  accountBalance: PropTypes.string.isRequired,
};

export default Transactions;

import React from "react";
import Transactions from "../../components/transactions/Transactions";
import UserName from "../../components/userName/UserName";
import "./user.css";

function User() {
  return (
    <main className="main bg-dark">
      <UserName />
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

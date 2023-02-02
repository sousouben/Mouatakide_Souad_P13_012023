import React, { useState } from "react";
import "./userName.css";
import { updateUserData } from "../../services/actions";
import { useDispatch } from "react-redux/es/exports";

function UserName({ userData }) {
  const dispatch = useDispatch();

  const [userName, setUsername] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function name(e) {
    e.preventDefault();

    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token") ||
      userData.token;

    const edit = dispatch(updateUserData(token, firstName, lastName));

    if (!edit) {
      return;
    }

    setUsername(false);
  }

  return userName ? (
    <div className="header">
      <h1 className="">Welcome back</h1>
      <form className="formChange" onSubmit={(e) => name(e)}>
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
            onClick={(e) => (e.preventDefault(e), setUsername(false))}
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
      <button className="edit-button" onClick={() => setUsername(true)}>
        Edit Name
      </button>
    </div>
  );
}

export default UserName;

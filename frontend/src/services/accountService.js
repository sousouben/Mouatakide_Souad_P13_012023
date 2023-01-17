//import Axios from "./callerService";

let logout = () => {
  localStorage.removeItem("token");
};

let isLogged = () => {
  let token = localStorage.getItem("token");
  return !!token;
};

export const accountService = {
  logout,
  isLogged,
};

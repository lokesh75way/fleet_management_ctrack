import axios from "axios";
import swal from "sweetalert";
import { loginConfirmedAction, Logout } from "../store/actions/AuthActions";
import { isAuthenticated } from "../store/selectors/AuthSelectors";
import initAxios from "./api";
import { useSearchParams } from "react-router-dom";
initAxios();

export function signUp(data) {
  return axios.post(`/auth/register`, data);
}

export function login(email, password) {
  const postData = {
    email,
    password,
    returnSecureToken: true,
  };

  return axios.post(`/auth/login`, postData);
}

export function formatError(errorResponse) {
  switch (errorResponse) {
    case "EMAIL_EXISTS":
      swal("Oops", "Email already exists", "error");
      break;
    case "User not found":
      swal("Oops", "User not found", "error", { button: "Try Again!" });
      break;
    case "Invalid email or password":
      swal("Oops", "Invalid Password", "error", { button: "Try Again!" });
      break;
    case "USER_DISABLED":
      return "User Disabled";

    default:
      return "";
  }
}

export function saveTokenInLocalStorage(tokenDetails) {
  localStorage.setItem("userDetails", JSON.stringify(tokenDetails));
}

export function runLogoutTimer(dispatch, timer, navigate) {
  // setTimeout(() => {
  //     //dispatch(Logout(history));
  //     dispatch(Logout(navigate));
  // }, timer);
}

export function checkAutoLogin(dispatch, navigate) {
  const tokenDetailsString = localStorage.getItem("userDetails");
  let tokenDetails = "";
  if (!tokenDetailsString) {
    dispatch(Logout(navigate));
    return;
  }
  tokenDetails = JSON.parse(tokenDetailsString);
  dispatch(loginConfirmedAction(tokenDetails));
}

export function isLogin() {
  const tokenDetailsString = localStorage.getItem("userDetails");

  if (tokenDetailsString) {
    return true;
  } else {
    return false;
  }
}

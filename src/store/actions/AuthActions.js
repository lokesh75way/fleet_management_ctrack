import { usePermissions } from "../../context/PermissionContext";
import {
  formatError,
  login,
  runLogoutTimer,
  saveTokenInLocalStorage,
  signUp,
} from "../../services/AuthService";
import { notifyError } from "../../utils/toast";

export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const LOGOUT_ACTION = "[Logout action] logout action";
export const SET_PERMISSION = "[Permission action] permission action";

export function signupAction(data, navigate) {
  return async (dispatch) => {
    await signUp(data)
      .then((response) => {
        saveTokenInLocalStorage(response.data);
        runLogoutTimer(
          dispatch,
          response.data.expiresIn * 1000
          //history,
        );
        navigate("/login");
        //history.push('/dashboard');
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = formatError(error?.response?.data);
        dispatch(signupFailedAction(errorMessage));
      });
  };
}

export function Logout(navigate) {
  localStorage.removeItem("userDetails");
  navigate("/login");
  //history.push('/login');

  return {
    type: LOGOUT_ACTION,
  };
}

export function loginAction(email, password, navigate) {
  return (dispatch) => {
    login(email, password)
      .then((response) => {
        saveTokenInLocalStorage(response.data.data);
        dispatch(loginConfirmedAction(response.data.data));
        dispatch(setPermissions(response.data.data.permissions));
        localStorage.setItem(
          "permission",
          JSON.stringify(response.data.data.permissions)
        );
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error?.response?.data?.message, "yt:0");
        const errorMessage = formatError(error?.response?.data?.message);
        dispatch(loginFailedAction(errorMessage));
      });
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}
export function setPermissions(data) {
  return {
    type: SET_PERMISSION,
    payload: data,
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}

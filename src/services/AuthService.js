import axios from 'axios';
import swal from "sweetalert";
import {
    loginConfirmedAction,
    Logout,
} from '../store/actions/AuthActions';
import { isAuthenticated } from '../store/selectors/AuthSelectors';
import initAxios from './api/Axios';
initAxios()

export function signUp(email, password) {
    //axios call
    const postData = {
        email,
        password,
        returnSecureToken: true,
    };
    return axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
        postData,
    );
    // return axios.post(
    //     `http://192.168.1.23:5000/api/api/auth/login`,
    //     postData,
    // );
}

export function login(email, password) {
    const postData = {
        email,
        password,
        returnSecureToken: true,
    };

    return axios.post(
        `http://192.168.1.31:5000/api/fleet/auth/login`,
        postData,
    )
}

export function formatError(errorResponse) {

    switch (errorResponse) {
        case 'EMAIL_EXISTS':            
            swal("Oops", "Email already exists", "error");
            break;
        case 'User not found':
           swal("Oops", "User not found", "error",{ button: "Try Again!",});
           break;
        case 'INVALID_PASSWORD':
            swal("Oops", "Invalid Password", "error",{ button: "Try Again!",});
            break;
        case 'USER_DISABLED':
            return 'User Disabled';

        default:
            return '';
    }
}

export function saveTokenInLocalStorage(tokenDetails) {
    localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
}

export function runLogoutTimer(dispatch, timer, navigate) {
    setTimeout(() => {
        //dispatch(Logout(history));
        dispatch(Logout(navigate));
    }, timer);
}

export function checkAutoLogin(dispatch, navigate) {
    const tokenDetailsString = localStorage.getItem('userDetails');
    let tokenDetails = '';
    if (!tokenDetailsString) {
        dispatch(Logout(navigate));
		return;
    }
    tokenDetails = JSON.parse(tokenDetailsString);
    dispatch(loginConfirmedAction(tokenDetails));
}


export function isLogin() {
    const tokenDetailsString = localStorage.getItem('userDetails');

    if (tokenDetailsString) {
        return true;
    }else{
        return false;
    }
}
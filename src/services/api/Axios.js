import axios from "axios";
import { store } from '../../store/store';

function initAxios() {
  axios.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth.auth.token;
    // config.baseURL = "https://8a0f-223-178-211-62.ngrok-free.app/api/fleet"
    // config.baseURL = "http://192.168.1.29:5000/api/fleet/"
    config.baseURL = process.env.REACT_APP_BACKEND_API
    config.headers.Authorization = `Bearer ${token}`
    return config;
  });

}
export default initAxios;

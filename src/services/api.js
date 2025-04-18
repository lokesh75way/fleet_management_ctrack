import axios from "axios";
import { store } from "../store/store";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  headers: { "X-Custom-Header": "foobar" },
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;
  config.baseURL = process.env.REACT_APP_BACKEND_API;
  config.headers.Authorization = `Bearer ${token}`;
  config.headers["ngrok-skip-browser-warning"] = true;
  return config;
});
// TODO: make this default export
export { axiosInstance };
// TODO: remove below
function initAxios() {
  axios.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth.token;
    config.baseURL = process.env.REACT_APP_BACKEND_API;
    // config.baseURL = "https://75way.com/api/fleet/";
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["ngrok-skip-browser-warning"] = true;
    return config;
  });
}
export default initAxios;

import axios from "axios";
import { store } from "../store/store";

const axiosInstance = axios.create({
  baseURL: `https://react-course-b798e-default-rtdb.firebaseio.com/`,
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.auth.idToken; // remove one auth if we want userDetails inside auth
  config.params = config.params || {};
  config.params["auth"] = token;
  return config;
});

export default axiosInstance;

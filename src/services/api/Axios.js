import axios from "axios";
import { store } from '../../store/store';

function initAxios(){
  axios.interceptors.request.use((config)=> {
    const state = store.getState();
        const token = state.auth.auth.token;
        config.baseURL = "http://localhost:5000/api/fleet/"
        config.headers.Authorization =  `Bearer ${token}`
        return config;
    });
    
}
export default initAxios;

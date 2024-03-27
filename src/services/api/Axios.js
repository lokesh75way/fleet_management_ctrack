import axios from "axios";
import { store } from '../../store/store';

const instance = axios.create({
  baseURL: "http://192.168.1.23:5000/api/",
  timeout: 50000,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",  
  },
});

instance.interceptors.request.use(function (config) {
//   let adminInfo;
//   if (Cookies.get("adminInfo")) {
//     adminInfo = JSON.parse(Cookies.get("adminInfo"));
//   }

//   let company;

//   if (Cookies.get("company")) {
//     company = Cookies.get("company");
//   }

//   return {
//     ...config,
//     headers: {
//       authorization: adminInfo ? `Bearer ${adminInfo.token}` : null,
//       company: company ? company : null,
//     },
//   };
const state = store.getState();
const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    const token = state.auth.auth.token;
    config.params = config.params || {};
    config.params['token'] = token;
    return {...config,
      headers: {
          authorization: userDetails?.token ? `Bearer ${userDetails.token}` : null,
        },
    };
});

const responseBody = (response) => response.data;

const requests = {
  get: (url, body, headers) =>
    instance.get(url, body, headers).then(responseBody),

  post: (url, body) => instance.post(url, body).then(responseBody),

  put: (url, body, headers) =>
    instance.put(url, body, headers).then(responseBody),

  patch: (url, body) => instance.patch(url, body).then(responseBody),

  delete: (url, body) => instance.delete(url, body).then(responseBody),
};

export default requests;

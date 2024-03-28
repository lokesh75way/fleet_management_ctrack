import axios from "axios";

const PasswordServices = {
  changePassword: async (body) => {
    return axios.put("/auth/change-password", body);
  },
  forgotPassword: async (body) => {
    return axios.post("/auth/forgot-password", body);
  },
  resetPassword: async (body) => {
    return axios.post("/auth/forgot-password", body);
  },


  //   getStaffById: async (id, body) => {
  //     return requests.post(`/admin/${id}`, body);
  //   },


};

export default PasswordServices;

import requests from "./Axios";

const PasswordServices = {
  changePassword: async (body) => {
    return requests.put("/auth/change-password", body);
  },
  forgotPassword: async (body) => {
    return requests.post("/auth/forgot-password", body);
  },
  resetPassword: async (body) => {
    return requests.post("/auth/forgot-password", body);
  },

  
//   getStaffById: async (id, body) => {
//     return requests.post(`/admin/${id}`, body);
//   },

 
};

export default PasswordServices;

import axios from "axios";
import initAxios from "./Axios";
initAxios();

const PasswordServices = {
  changePassword: async (body) => {
    return axios.put("/auth/change-password", body);
  },
  forgotPassword: async (body) => {
    try {
      const response = await axios.post("/auth/forgot-password", body);
      return response;
    } catch (error) {
      return { error: "Couldn't send Email" };
    }
  },
  resetPassword: async (body) => {
    try {
      const response = await axios.put("/auth/reset-password", body);
      return response;
    } catch (error) {
      return { error: "Couldn't reset Password" };
    }
  },

  //   getStaffById: async (id, body) => {
  //     return requests.post(`/admin/${id}`, body);
  //   },
};

export default PasswordServices;

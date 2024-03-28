import axios from "axios";
import initAxios from "./Axios";
initAxios()

const UserServices = {
  createUser : async (body) => {
    return axios.post("/user", body);
  },
  getUser: async () => {
    return axios.get("/user");
  },
  deleteUser: async (id) => {
    return axios.delete(`/user/${id}`);
  },
  updateuser : async (body, id) => {
    return axios.put(`/user/${id}`, body)
  }

};

export default UserServices;

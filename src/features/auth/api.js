import { axiosInstance as axios } from "@/services/api";

export function signUp(data) {
  return axios.post(`/auth/register`, data);
}

export async function login({ email, password }) {
  const postData = {
    email,
    password,
    returnSecureToken: true,
  };

  const { data } = await axios.post(`/auth/login`, postData);
  return data?.data;
}

export const changePassword = async (body) => {
  return axios.put("/auth/change-password", body);
};

export const forgotPassword = async (body) => {
  const response = await axios.post("/auth/forgot-password", body);
  return response;
};

export const resetPassword = async (body) => {
  const response = await axios.put("/auth/reset-password", body);
  return response;
};

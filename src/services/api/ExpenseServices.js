import axios from "axios";
import initAxios from "../api";
initAxios();

export const getExpenses = async (pageNo = 1) => {
  const { data } = await axios.get(`/expenses?page=${pageNo}&limit=${10}`);
  return { data: data.data.data, totalLength: data.data.totalCount };
};

export const createExpense = async (body) => {
  return axios.post("/expenses", body);
};

export const updateExpense = async (id, body) => {
  return axios.patch(`/expenses/${id}`, body);
};

export const deleteExpense = async (id) => {
  return axios.delete(`/expenses/${id}`);
};

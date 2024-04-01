import axios from "axios";
import initAxios from "./Axios";
initAxios()

export const getUser = async () => {
  try{
    const response = await axios.get("/users")
    return response?.data?.data
  }catch(error){
    return { error: "Couldn't fetch User" }
  }
}

export const deleteUser = async (id) => {
  try{
    const response = await axios.delete(`/users/${id}`)
    return response?.data?.data
  }
  catch(error){
    return { error: "Couldn't delete User" }
  }
}

export const createUser = async (data) => {
  try {
    const response = await axios.post("/users", data)
    console.log("response", response)
    return response?.data?.data
  }catch(error){
    console.log("error")
    return { error: "Couldn't Create User" }
  }
}

export const updateUser = async (data, id) => {
  try {
    const response = await axios.put(`/users/${id}`, data)
    console.log("response", response)
    return response?.data?.data
  }catch(error){
    console.log("error")
    return { error: "Couldn't Update User" }
  }
}

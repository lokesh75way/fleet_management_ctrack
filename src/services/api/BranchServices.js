import axios from "axios";
const getAllBranch = async () => {
    try {
      const response = await axios.get("/branch");
      console.log(response.data.data, "branch")
        return response.data.data.data;
    } catch(error){
      console.error("Error fetching templates:", error);
      return { error: "Couldn't fetch User" }
    }
  }

export {getAllBranch}
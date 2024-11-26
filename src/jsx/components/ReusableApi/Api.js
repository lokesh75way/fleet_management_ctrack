import { getAllBranch } from "../../../services/api/BranchServices";
import { getGroups } from "../../../services/api/BusinessGroup";
import { getCompany } from "../../../services/api/CompanyServices";

export const businessGroupOptions = async (inputValue) => {
  try {
    const businessGroupResponse = await getGroups();
    const businessGroupData = businessGroupResponse.data;
    const response = businessGroupData.map((item) => ({
      label: item?.businessGroupId?.groupName,
      value: item?.businessGroupId?._id,
    }));
    return response;
  } catch (error) {
    console.error("Error fetching business group options:", error);
    return []; // Return empty array in case of an error
  }
};

export const allCompanyOptions = async (inputValue) => {
  try {
    const companyResponse = await getCompany();
    const companyData = companyResponse.data.data.data;
    const response = companyData.map((item) => ({
      label: item?.companyId?.companyName,
      value: item?.companyId?._id,
    }));
    return response;
  } catch (error) {
    console.error("Error fetching company options:", error);
    return []; // Return empty array in case of an error
  }
};

export const allBranchOptions = async (inputValue) => {
  try {
    const branchResponse = await getAllBranch();
    const branchData = branchResponse.data.data.data;
    const response = branchData.map((item) => ({
      label: item?.branchId?.branchName,
      value: item?.branchId?._id,
    }));
    return response;
  } catch (error) {
    console.error("Error fetching company options:", error);
    return []; // Return empty array in case of an error
  }
};

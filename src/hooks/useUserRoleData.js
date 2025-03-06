import { useState, useEffect } from "react";

const getUserRoleData = (user) => {
  if (!user) return null;

  const role = user?.role;
  const bGroup = user?.businessGroupId?.[0] || null;
  const company = user?.companyId?.[0] || null;
  const branches = user?.branchIds || [];
  const vehicles = user?.vehicleIds || [];

  return { role, bGroup, company, branches, vehicles, user };
};

export const useUserRoleData = () => {
  const [groupId, setGroupId] = useState(null);
  const [groupName, setGroupName] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [branchIds, setBranchIds] = useState([]);
  const [vehicleIds, setVehicleIds] = useState([]);
  const [businessDisabled, setBusinessDisabled] = useState(false);
  const [companyDisabled, setCompanyDisabled] = useState(false);
  const [branchDisabled, setBranchDisabled] = useState(false);
  const [vehicleDisabled, setVehicleDisabled] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (!userDetails) return;

    const { role, bGroup, company, branches, vehicles, user } = getUserRoleData(userDetails.user);
    if (!role) return;

    // Store full user data
    setUserData(user);
    setGroupId(null);
    setGroupName(null);
    setCompanyId(null);
    setCompanyName(null);
    setBranchIds([]);
    setVehicleIds([]);
    setBusinessDisabled(false);
    setCompanyDisabled(false);
    setBranchDisabled(false);
    setVehicleDisabled(false);

    // BUSINESS_GROUP role
    if (role === "BUSINESS_GROUP" && bGroup) {
      setGroupId(bGroup._id);
      setGroupName(bGroup.groupName);
      setBusinessDisabled(true);
      return;
    }

    // COMPANY role
    if (role === "COMPANY") {
      if (bGroup) {
        setGroupId(bGroup._id);
        setGroupName(bGroup.groupName);
        setBusinessDisabled(true);
      }
      if (company) {
        setCompanyId(company._id);
        setCompanyName(company.companyName);
        setCompanyDisabled(true);
      }
      if (branches.length > 0) {
        setBranchIds(branches);
        setBranchDisabled(false);
      }
      return;
    }

    // USER role
    if (role === "USER") {
      if (bGroup) {
        setGroupId(bGroup._id);
        setGroupName(bGroup.groupName);
        setBusinessDisabled(true);
      }

      if (company) {
        setCompanyId(company._id);
        setCompanyName(company.companyName);
        setCompanyDisabled(true);
      }

      if (branches.length > 0) {
        setBranchIds(branches);
        setBranchDisabled(false);
      }

      if (vehicles.length > 0) {
        setVehicleIds(vehicles);
        setVehicleDisabled(false);
      }
      return;
    }
  }, []);

  return { 
    groupId, groupName, setGroupId, setGroupName, businessDisabled, setBusinessDisabled,
    companyId, companyName, setCompanyId, setCompanyName, companyDisabled, setCompanyDisabled,
    branchIds, setBranchIds, branchDisabled, setBranchDisabled,
    vehicleIds, setVehicleIds, vehicleDisabled, setVehicleDisabled,
    userData
  };
};

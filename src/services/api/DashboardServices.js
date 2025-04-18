import axios from "axios";

export const getFleetUsage = async () => {
  try {
    const data = await axios.get("/dashboard/fleet-usage");
    return data.data.data;
  } catch (error) {
    return error;
  }
};

export const getFleetStatus = async () => {
  try {
    const data = await axios.get("/dashboard/fleet-status");
    return data.data.data;
  } catch (error) {
    return error;
  }
};

export const fleetFuel = async () => {
  try {
    const data = await axios.get("/dashboard/fleet-fuel");
    return data.data.data;
  } catch (error) {
    return error;
  }
};

export const getOverSpeeding = async () => {
  try {
    const data = await axios.get("/dashboard/overspeed");
    return data.data.data;
  } catch (error) {
    return error;
  }
};

export const fleetMaintenance = async () => {
  try {
    const data = await axios.get("/dashboard/maintainance-reminder");
    return data.data.data;
  } catch (error) {
    return error;
  }
};

export const renewalReminder = async () => {
  try {
    const data = await axios.get("/dashboard/renewal-reminder");
    return data.data.data;
  } catch (error) {
    return error;
  }
};

export const getFleetIdle = async () => {
  try {
    const data = await axios.get("/dashboard/fleet-idle");
    return data.data.data;
  } catch (error) {
    return error;
  }
};

export const getDashboardTasks = async () => {
  try {
    const data = await axios.get("/dashboard/tasks");
    return data.data.data;
  } catch (error) {
    return error;
  }
};

export const getAllTasks = async () => {
  let url = `/dashboard/tasks-data`;
  const response = await axios.get(url);
  return response?.data?.data;
};

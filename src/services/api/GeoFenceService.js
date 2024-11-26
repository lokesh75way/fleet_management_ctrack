import axios from "axios";

export const getGeofenceData = async (pageNo = 1, limit = 10) => {
  const data = await axios.get(`/geofences?page=${pageNo}&limit=${limit}`);
  return data.data.data;
};

export const deleteGeofenceData = async (id) => {
  const { data } = await axios.delete(`/geofences/${id}`);
  return data;
};

export const createGeofenceData = async (body) => {
  const { data } = await axios.post("/geofences", body);
  return data;
};

export const getGeofenceById = async (id) => {
  const { data } = await axios.get(`/geofences/${id}`);
  return data;
};

export const updateGeofence = async (id, body) => {
  const { data } = await axios.patch(`/geofences/${id}`, body);
  return data;
};

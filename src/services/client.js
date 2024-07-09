import axios from "axios";

const baseInstance = () => {
  const API_URL = process.env.REACT_APP_API_URL_DEV;
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  return axios.create({
    baseURL: [API_URL],
    timeout: 5000,
    headers,
  });
};

const authInstance = () => {
  const API_URL = process.env.REACT_APP_API_URL_DEV;
  const authToken = localStorage.getItem("token");
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (authToken) {
    headers = { ...headers, Authorization: `Bearer ${authToken}` };
  }
  return axios.create({
    baseURL: [API_URL],
    timeout: 25000,
    headers,
  });
};

const multiPInstance = () => {
  const API_URL = process.env.REACT_APP_API_URL_DEV;
  const authToken = localStorage.getItem("token");
  let headers = {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  };

  if (authToken) {
    headers = { ...headers, Authorization: `Bearer ${authToken}` };
  }
  return axios.create({
    baseURL: [API_URL],
    timeout: 25000,
    headers,
  });
};

export default { baseInstance, authInstance, multiPInstance };

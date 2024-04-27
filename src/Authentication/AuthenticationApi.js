import axios from "axios";
import { server } from "../constants/config";

const getToken = () => {
  return localStorage.getItem("token");
}

export async function loginUser(data) {
  try {
    const response = await axios.post(`${server}/user/login`, data);
    if (response.status === 200 || response.status === 201 ) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export async function registerUser(data) {
  try {
    const response = await axios.post(
      `${server}/user/new`,
      data
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export async function getProfile() {
  const token = getToken();
  try {
    const response = await axios.get(`${server}/user/profile`, {
      headers: {
        Authorization: token,
      },
    });
    if (response.status === 200 || response.status ===201) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}



import axios from "axios";

const USER_URL = "http://localhost:8080/api/v1/user";

export const getUsers = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${USER_URL}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
    throw Error(error.response?.data?.result || "Get Users Failed");
  }
};

export const addUser = async (user) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(`${USER_URL}/`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
    throw Error(error.response?.data?.result || "Add User Failed");
  }
};

export const lockUnlockUser = async (userId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${USER_URL}/${userId}/lock-unlock/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
    throw Error(error.response?.data?.result || "Lock User Failed");
  }
};

export const updateUser = async (user) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.put(`${USER_URL}/`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
    throw Error(error.response?.data?.result || "Update User Failed");
  }
};

export const getUserById = async (userId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${USER_URL}/${userId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
    throw Error(error.response?.data?.result || "Get User Failed");
  }
};

export const changePassword = async (passwordData) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(
      `${USER_URL}/change-password/`,
      passwordData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.log(error);
    throw Error(error.response?.data?.result || "Update User Password Failed");
  }
};

export const resetPassword = async (userId) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${USER_URL}/${userId}/reset/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
    throw Error(error.response?.data?.result || "Reset Password Failed");
  }
};

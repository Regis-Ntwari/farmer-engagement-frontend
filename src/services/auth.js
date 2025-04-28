// services/auth.js

import axios from "axios";

const AUTH_URL = "http://localhost:8080/api/v1/auth";

export const login = async (credentials) => {
  const response = await fetch(`${AUTH_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    console.log(error.result);
    throw new Error(error.result);
  }

  const data = await response.json();

  localStorage.setItem("authToken", data.result.token); // Store token

  localStorage.setItem("role", JSON.stringify(data.result.role));

  localStorage.setItem("id", JSON.stringify(data.result.id));

  return data;
};

export const signup = async ({
  username,
  password,
  firstname,
  lastname,
  farmName,
  district,
  sector,
}) => {
  try {
    const response = await axios.post(`${AUTH_URL}/farmer/`, {
      username,
      password,
      firstname,
      lastname,
      farm_name: farmName,
      district,
      sector,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.result || "Sign Up failed");
  }
};

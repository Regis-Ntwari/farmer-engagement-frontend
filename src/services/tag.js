import axios from "axios";

const TAG_URL = "http://localhost:8080/api/v1/tag";

export const getTags = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${TAG_URL}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.result;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.result || "Sign Up failed");
  }
};

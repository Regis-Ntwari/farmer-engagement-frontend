import axios from "axios";

const BEST_PRACTICE_URL = "http://localhost:8080/api/v1/best-practice";

export const getContents = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${BEST_PRACTICE_URL}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
    throw Error(error.response?.data?.result || "Get Contents Failed");
  }
};

export const addBestPractice = async (bestPractice) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(`${BEST_PRACTICE_URL}/`, bestPractice, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
    throw Error(error.response?.data?.result || "Add Best Practice Failed");
  }
};

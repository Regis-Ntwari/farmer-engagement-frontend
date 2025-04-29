import axios from "axios";

const STATISTICS_URL = "http://localhost:8080/api/v1/stats";
export const getContents = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${STATISTICS_URL}/summary/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
    throw Error(error.response?.data?.result || "Get Statistics Failed");
  }
};

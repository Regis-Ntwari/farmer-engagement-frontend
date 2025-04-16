import axios from "axios";

const CONTENT_URL = "http://localhost:8080/api/v1/content";

export const addContent = async (formData) => {
  try {
    const token = localStorage.getItem("authToken");
    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("content", formData.content);
    dataToSend.append("tag", formData.tag);
    if (formData.file) {
      dataToSend.append("file", formData.file);
    }

    const { data } = await axios.post(`${CONTENT_URL}/`, dataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    throw Error(error.response?.data?.result || "Add content failed");
  }
};

export const getContents = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${CONTENT_URL}/`, {
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

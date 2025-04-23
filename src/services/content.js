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

export const getContentById = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${CONTENT_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.result;
  } catch (error) {
    throw Error(error.response?.data?.result || "Get Content by ID Failed");
  }
};

export const upvoteDownvoteComment = async (contentId, type) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(
      `${CONTENT_URL}/upvote-downvote/`,
      {
        content_id: parseInt(contentId),
        action: type,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Upvote/Downvote error:", error);
    throw Error(error.response?.data?.result || "Upvote/Downvote Failed");
  }
};

export const addComment = async (contentId, comment) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(
      `${CONTENT_URL}/comment/`,
      {
        comment: comment,
        content_id: parseInt(contentId),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Add Comment error:", error);
    throw Error(error.response?.data?.result || "Add Comment Failed");
  }
};

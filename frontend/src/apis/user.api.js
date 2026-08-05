import api from "../utilis/axios.js";

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/api/me");
    return response.data;
  } catch (error) {
    console.log(error.response?.data);

    return {
      status: false,
      user: null,
      message: error.response?.data?.message || "No User Found",
    };
  }
};
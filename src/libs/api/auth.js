import { BASE_URL } from "../../constants/index.js";
import { instance } from "../instance.js";

export const loginApi = async (email, password) => {
  try {
    const response = await instance(BASE_URL + "/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ email, password }),
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

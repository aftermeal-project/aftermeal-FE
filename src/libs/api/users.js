import { BASE_URL } from "../../constants/index.js";
import { instance } from "../instance.js";

export const registerApi = async (data) => {
  try {
    const response = await instance(BASE_URL + "/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

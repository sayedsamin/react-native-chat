import axios from "axios";
import { activeUrl } from "../../store/constants";

export const getUserQueryHome = async (token) => {
  try {
    const result = await axios.get(`${activeUrl}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    console.log(
      "🚀 ~ file: HomeService.ts:15 ~ getUserQueryHome ~ error:",
      error
    );
    throw error;
  }
};

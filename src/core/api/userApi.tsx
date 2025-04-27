import axios from "axios";
import { baseUrl } from "../constant";

export const getUserRole = async (phone: any): Promise<any> => {
  const response = await axios.post<any>(`${baseUrl}/get-role`, phone);
  return response.data;
};
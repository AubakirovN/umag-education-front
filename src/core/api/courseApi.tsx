import axios from "axios";
import { baseUrl } from "../constant";

export const getCourses = async (params: any): Promise<any> => {
  const response = await axios.get<any>(`${baseUrl}/courses`, { params });
  return response.data;
};

export const getCourse = async (id: string): Promise<any> => {
  const response = await axios.get<any>(`${baseUrl}/courses/${id}`);
  return response.data;
};

export const getRoles = async (params: any): Promise<any> => {
  const response = await axios.get<any>(`${baseUrl}/roles`, { params });
  return response.data;
};
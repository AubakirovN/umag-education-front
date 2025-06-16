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

export const startCourse = async (courseId: string): Promise<any> => {
  const response = await axios.get<any>(`${baseUrl}/courses/front/${courseId}`);
  return response.data;
};

export const getUserProgress = async (): Promise<any> => {
  const response = await axios.get(`${baseUrl}/user/progress`);
  return response.data;
};

export const getSublessonsByLessonId = async (
  lessonId: string
): Promise<any> => {
  const response = await axios.get(`${baseUrl}/lessons/${lessonId}/sublessons`);
  return response.data;
};

export const completeSublesson = async (sublessonId: string): Promise<any> => {
  const response = await axios.get(
    `${baseUrl}/sublessons/complete/${sublessonId}`
  );
  return response.data;
};

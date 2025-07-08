import axios from "axios";
import { baseUrl } from "../constant";

console.log("Base URL:", baseUrl);

export const getCourses = async (params: any): Promise<any> => {
  const response = await axios.get<any>(`${baseUrl}/courses`, { params });
  return response.data;
};

export const getCourse = async (id: string): Promise<any> => {
  const response = await axios.get<any>(`${baseUrl}/courses/${id}`);
  return response.data;
};

export const getRoles = async (params: any): Promise<any> => {
  const response = await axios.get<any>(`${baseUrl}/roles-front`, { params });
  return response.data;
};

export const startCourse = async (courseId: string): Promise<any> => {
  const response = await axios.get<any>(`${baseUrl}/courses/front/${courseId}`);
  return response.data;
};

export const checkCourseStatus = async (courseId: string): Promise<any> => {
  const response = await axios.get<any>(`${baseUrl}/courses/front-status/${courseId}`);
  return response.data;
};
export const checkIsAvailableCourse = async (courseId: string): Promise<any> => {
  const response = await axios.get<any>(`${baseUrl}/courses/front-check/${courseId}`);
  return response.data;
}

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

export const getTestByBlock = async (courseId: string, blockId: string): Promise<any> => {
  const response = await axios.get(`${baseUrl}/test-questions/random/${courseId}/${blockId}`);
  return response.data;
};

export const completeTest = async (body: any): Promise<any> => {
  const response = await axios.post(`${baseUrl}/test-attempts`, body);
  return response.data;
};

export const getLastSublesson = async (courseId: string): Promise<any> => {
  const response = await axios.get(`${baseUrl}/sublessons/next/${courseId}`);
  return response.data;
}

export const checkTestAvailable = async (courseId: string, blockId: string): Promise<any> => {
  const response = await axios.get(`${baseUrl}/test-attempts/check/${courseId}/${blockId}`);
  return response.data;
}

export const getTestResult = async (blockId: string): Promise<any> => {
  const response = await axios.get(`${baseUrl}/test-attempts/get-result/${blockId}`);
  return response.data;
}

export const getCertification = async (courseId: string): Promise<any> => {
  const response = await axios.get(`${baseUrl}/courses/front-certificate/${courseId}`);
  return response.data;
}
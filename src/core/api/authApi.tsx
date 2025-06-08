import {
  ConfirmPassDto,
  LoginDto,
  RegisterDto,
  ResetPassDto,
} from "@/core/types";
import axios from "axios";
import { baseUrl } from "../constant";

export const login = async (body: LoginDto): Promise<any> => {
  const response = await axios.post<any>(`${baseUrl}/login`, body);
  return response.data;
};

export const getUserInfo = async (): Promise<any> => {
  const response = await axios.get<any>(`${baseUrl}/user`);
  return response.data;
};

export const register = async (body: RegisterDto): Promise<any> => {
  const response = await axios.post<any>(`${baseUrl}/register`, body);
  return response.data;
};

export const confirmPass = async (body: ConfirmPassDto): Promise<any> => {
  const response = await axios.post<any>(`${baseUrl}/confirm-email`, body);
  return response.data;
};

export const resetPass = async (body: ResetPassDto): Promise<any> => {
  const response = await axios.post<any>(`${baseUrl}/reset-password`, body);
  return response.data;
};
export const editProfile = async (body: any): Promise<any> => {
  const response = await axios.put(`${baseUrl}/profile`, body);
  return response.data;
};
export const confirmNewEmail = async (body: any): Promise<any> => {
  const response = await axios.post(`${baseUrl}/profile/confirm-email`, body);
  return response.data;
};

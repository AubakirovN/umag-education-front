
export type LoginDto = {
  phone: string;
  password: string;
};
export type RegisterDto = {
  name: string;
  email: string;
  // password: string;
  // role: string;
  phone: string;
};
export type ConfirmPassDto = {
  register_token: string
  password: string
};
export type ResetPassDto = {
  phone: string;
};
export type AddUserDto = {
  phone: string;
  role: string;
}
export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  created_at: string;
  updated_at: string;
}
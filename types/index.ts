export interface RegisterUserRequest {
  username: string;
  email: string;
  password: string;
  repeat_password: string;
}

export interface RegisterUserResponse {
  message: string;
  access_token: string;
}

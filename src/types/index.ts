import { Request } from 'express';

export interface RegisterUserRequest {
  username: string;
  email: string;
  password: string;
  repeat_password: string;
}

export interface RegisterUserResponse {
  message: string;
  access_token: string;
  refresh_token: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface CustomRequest extends Request {
  user: {
    _id: string;
    role: string;
  };
}

export function hasUserAuth(req: Request): req is CustomRequest {
  return (
    (req as CustomRequest).user !== undefined &&
    (req as CustomRequest).user._id !== undefined &&
    (req as CustomRequest).user.role !== undefined
  );
}

import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../../models';
import { IUser } from '../../models/UserModel';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import JwtService from '../../services/JwtService';
import { RegisterUserRequest } from '../../types';
import { loginSchema } from '../../validation';

type LoginResponse = { access_token: string };

const loginUser = async (
  req: Request<RegisterUserRequest>,
  res: Response<LoginResponse>,
  next: NextFunction
) => {
  const { email, password } = loginSchema.parse(req.body);

  const user: IUser | null = await UserModel.findOne({ email });

  if (!user) {
    return next(CustomErrorHandler.wrongUserCredentials());
  }

  //[ ] verify if password matches

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return next(CustomErrorHandler.userAuthFailed());
  }

  // [ ] sign jwt

  const access_token = await JwtService.sign({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    _id: user._id,
    role: user.role,
  });

  res.json({
    access_token,
  });
};

export default {
  loginUser,
};

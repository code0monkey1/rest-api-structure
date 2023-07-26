import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../../models';
import { IUser } from '../../models/UserModel';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import JwtService from '../../services/JwtService';
import { RegisterUserRequest, RegisterUserResponse } from '../../types';
import { loginSchema } from '../../validation';

const loginUser = async (
  req: Request<RegisterUserRequest>,
  _res: Response<RegisterUserResponse>,
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  await JwtService.sign({ _id: user._id, role: user.role });
};

export default {
  loginUser,
};

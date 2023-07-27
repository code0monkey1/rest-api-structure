import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../../models';
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
  //[+] validate login user schema

  const { email, password } = loginSchema.parse(req.body);

  console.log(
    '🚀 ~ file: loginController.ts:20 ~  email, password :',
    email,
    password
  );

  const user = await UserModel.findOne({ email });

  console.log('🚀 ~ file: loginController.ts:22 ~ user:', user);

  if (!user) {
    return next(CustomErrorHandler.wrongUserCredentials());
  }

  //[+] verify if password matches

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return next(CustomErrorHandler.userAuthFailed());
  }

  // [+] sign jwt

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

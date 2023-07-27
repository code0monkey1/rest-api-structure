import { Request, Response } from 'express';
import { UserModel } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import EncryptionService from '../../services/EncryptionService';
import JwtService from '../../services/JwtService';
import { RegisterUserRequest } from '../../src/types';
import { loginSchema } from '../../validation';

type LoginResponse = { access_token: string };

const loginUser = async (
  req: Request<RegisterUserRequest>,
  res: Response<LoginResponse>
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
    throw CustomErrorHandler.wrongCredentials();
  }

  //[+] verify if password matches

  const match = await EncryptionService.isMatch(password, user.password);

  if (!match) {
    throw CustomErrorHandler.wrongCredentials();
  }

  // [+] sign jwt

  const access_token = await JwtService.sign({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    _id: user._id,
    role: user.role,
  });

  //[+] create refresh token
  const refresh_token = await JwtService.sign(
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      _id: newUser._id,
      role: newUser.role,
    },
    '1y',
    REFRESH_TOKEN_SECRET
  );

  //[+] save refresh token to db
  await RefreshTokenModel.create({ token: refresh_token });

  // [+] send jwt to frontend
  res.json({
    access_token,
  });
};

export default {
  loginUser,
};

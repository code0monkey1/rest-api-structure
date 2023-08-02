import { Request, Response } from 'express';
import { REFRESH_TOKEN_SECRET } from '../../config';
import { RefreshToken, User } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import EncryptionService from '../../services/EncryptionService';
import JwtService from '../../services/JwtService';
import { LoginResponse, RegisterUserRequest } from '../../types';
import { loginSchema } from '../../validation';

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

  const user = await User.findOne({ email });

  console.log('🚀 ~ file: loginController.ts:22 ~ user:', user);

  if (!user) throw CustomErrorHandler.wrongCredentials();

  //[+] verify if password matches

  const match = await EncryptionService.isMatch(password, user.password);

  if (!match) throw CustomErrorHandler.wrongCredentials();

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
      _id: user._id,
      role: user.role,
    },
    '1y',
    REFRESH_TOKEN_SECRET
  );

  //[+] save refresh token to db
  await RefreshToken.create({ token: refresh_token });

  // [+] send jwt to frontend
  res.json({
    access_token,
    refresh_token,
  });
};

export default {
  loginUser,
};

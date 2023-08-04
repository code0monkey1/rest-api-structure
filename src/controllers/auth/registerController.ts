import { Request, Response } from 'express';
import { REFRESH_TOKEN_SECRET } from '../../config';
import { RefreshToken, User } from '../../models';
import { IUser } from '../../models/UserModel';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import EncryptionService from '../../services/EncryptionService';
import JwtService from '../../services/JwtService';
import { RegisterUserRequest, RegisterUserResponse, Role } from '../../types';
import { registerSchema } from '../../validation';
const registerUser = async (
  req: Request<RegisterUserRequest>,
  res: Response<RegisterUserResponse>
) => {
  // [+] validate the request and extract info
  const { username, email, password } = await registerSchema.parseAsync(
    req.body
  );

  //[+] check if user is in database already

  const userExists = await User.exists({ email });

  if (userExists)
    throw CustomErrorHandler.alreadyExists('This email is already taken');

  //[+] create new user

  const hashedPassword = await EncryptionService.getHashedToken(password);
  //[+] save user to database
  const user: IUser = await createUser({
    email,
    password: hashedPassword,
    username,
  });

  //[+] create access_token

  const access_token = await JwtService.sign({
    _id: user._id as string,
    role: user.role,
  });

  //[+] create refresh_token

  const refresh_token = await JwtService.sign(
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      _id: user.id,
      role: user.role,
    },
    '1y',
    REFRESH_TOKEN_SECRET
  );

  //[+] save refresh token to db
  await RefreshToken.create({ token: refresh_token });

  // [+] send response

  res.send({ access_token, refresh_token });
};

async function createUser(userInfo: {
  password: string;
  username: string;
  email: string;
}) {
  const user = {
    ...userInfo,
    role: Role.ADMIN,
  };

  const savedUser: IUser = await User.create(user);

  return savedUser;
}

export default {
  registerUser,
};

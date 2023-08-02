import { Request, Response } from 'express';
import { REFRESH_TOKEN_SECRET } from '../../config';
import { RefreshToken, User } from '../../models';
import { IUser } from '../../models/User';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import EncryptionService from '../../services/EncryptionService';
import JwtService from '../../services/JwtService';
import { RegisterUserRequest, RegisterUserResponse } from '../../types';
import { registerSchema } from '../../validation';
const registerUser = async (
  req: Request<RegisterUserRequest>,
  res: Response<RegisterUserResponse>
) => {
  //Checklist
  const body: unknown = await req.body;

  // [+] validate the request
  const validatedData: RegisterUserRequest = registerSchema.parse(body);

  console.log('body', validatedData);

  //[+] check if user is in database already

  const { username, email, password } = validatedData;

  /* The line `const userExists = await UserModel.exists({ email });` is checking if a user with the
   given email already exists in the database. It uses the `exists` method of the `UserModel` to
   perform the check. The `exists` method takes a query object as an argument, in this case `{ email
   }`, and returns a boolean value indicating whether a document matching the query exists in the
   database. */
  const userExists = await User.exists({ email });

  if (userExists)
    throw CustomErrorHandler.alreadyExists('This email is already taken');

  //[+] prepare model

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const hashedPassword = await EncryptionService.getHashedToken(password);

  const user = {
    username,
    email,
    password: hashedPassword,
    role: 'whatever',
  };

  //[+] store in database

  const newUser: IUser = await User.create(user);

  console.log('new user created', JSON.stringify(newUser, null, 3));

  //[+] generate jwt

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const access_token = await JwtService.sign({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    _id: newUser._id,
    role: newUser.role,
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
  await RefreshToken.create({ token: refresh_token });

  // [+] send response
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  res.send({ access_token, refresh_token });
};

export default {
  registerUser,
};

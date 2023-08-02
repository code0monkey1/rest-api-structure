import { Request, Response } from 'express';
import { RefreshToken, User } from '../../models';

import CustomErrorHandler from '../../services/CustomErrorHandler';
import { hasUserAuth } from '../../types';
import { refreshTokenSchema } from '../../validation';
import { IRefreshToken } from './refreshTokenController';

/**
 * This TypeScript function retrieves user information from the request object, removes unnecessary
 * fields, and returns the user information in a JSON response.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request headers, request body, request method, and
 * request URL.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to manipulate the response,
 * such as `json()` which is used to send a JSON response.
 */
const me = async (req: Request, res: Response): Promise<void> => {
  //[+] Ensure that user Auth Info is present in the request object ,using a Type Guard

  if (!hasUserAuth(req))
    throw CustomErrorHandler.userAuthFailed('user not attached');

  //[+] Retrieve required user info , while removing the un-necessary fields
  const EXCLUDED_FIELDS = '-password -updatedAt -createdAt -__v';

  /*  The `select` method is used to
    specify which fields should be included or excluded from the result. In this case, the
    `-password -updatedAt -createdAt -__v` fields are excluded from the result. */

  const foundUser = await User.findById(req.user._id).select(EXCLUDED_FIELDS);

  console.log('🚀 ~ file: userController.ts:15 ~ foundUser:', foundUser);
  //[+] If user not found - throw appropriate error
  if (!foundUser) throw CustomErrorHandler.notFound('User Not Found');

  //[+] Return user information

  res.json(foundUser);
};

const logout = async (req: Request, res: Response) => {
  const body: unknown = await req.body;

  const data: IRefreshToken = refreshTokenSchema.parse(body);

  //[+] Find Refresh Token in DB and delete
  await RefreshToken.findOneAndDelete({ token: data.refresh_token });

  res.status(204).end();
};

export default {
  me,
  logout,
};

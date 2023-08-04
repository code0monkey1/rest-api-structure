import { NextFunction, Request, Response } from 'express';
import { JWT_SECRET } from '../config';
import CustomErrorHandler from '../services/CustomErrorHandler';
import JwtService from '../services/JwtService';
// import JwtService from '../services/JwtService';

/**
 * The auth function checks if a JWT token is present in the authorization header and logs the token.
 * @returns In this code snippet, if the `authHeader` is not present, the function will return the
 * result of `next(CustomErrorHandler.userAuthFailed('JWT Missing'))`.
 */

export interface CustomRequest extends Request {
  user: {
    _id: string;
    role: string;
  };
}

const auth = (req: Request, _res: Response, next: NextFunction) => {
  //[+] authorize the request

  const authHeader = req.headers.authorization;
  //[+] If there is no auth header in the request, throw error
  if (!authHeader)
    throw CustomErrorHandler.userAuthFailed('Authorization Header Missing');

  //[+] If the authorization does not begin with Bearer , throw an error
  if (authHeader.split(' ')[0] !== 'Bearer')
    throw CustomErrorHandler.userAuthFailed('`Bearer` missing');

  //[+] extract the token

  const token = authHeader.split(' ')[1];

  //[+] if no token , raise exception

  if (!token) throw CustomErrorHandler.userAuthFailed('auth token not found');

  //[+] attach token to request object
  const userInfo = destructureToken(token);

  //[+] cast to a custom request to attach user to it , else it won't attach
  (req as CustomRequest).user = userInfo;

  next();
};

export function destructureToken(token: string, secret = JWT_SECRET) {
  let userInfo;

  try {
    //[+] verification leads to the unbundling of the token , and thereby reveals the content
    const { _id, role } = JwtService.verify(token, secret);

    userInfo = {
      _id,
      role,
    };
    //[+] attach user info in token to  Request Object
    //?? ( carry out appropriate casting )
  } catch (e) {
    //[+] Make sure you return auth failure , in case
    throw CustomErrorHandler.userAuthFailed('J.W.T Invalid');
  }

  return userInfo;
}

export default auth;

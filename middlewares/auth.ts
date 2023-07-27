import { NextFunction, Request, Response } from 'express';
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
  const authHeader = req.headers.authorization;

  if (!authHeader)
    throw CustomErrorHandler.userAuthFailed('Authorization Header Missing');

  const token = authHeader.split(' ')[1];

  console.log('token:', token);

  try {
    // verification un-bundles the jwt and provides the info within it
    const { _id, role } = JwtService.verify(token);

    const userInfo = {
      _id,
      role,
    };

    (req as CustomRequest).user = userInfo;
  } catch (e) {
    throw CustomErrorHandler.userAuthFailed('J.W.T Invalid');
  }

  next();
};

export default auth;

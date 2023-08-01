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
  //[+] authorize the request

  const authHeader = req.headers.authorization;

  if (!authHeader)
    throw CustomErrorHandler.userAuthFailed('Authorization Header Missing');
  //[+] extract the token
  const token = authHeader.split(' ')[1];

  try {
    //[+]  un-bundle the jwt and provides the info within it

    //??( verification leads to un-bundling automatically )

    const { _id, role } = JwtService.verify(token);

    const userInfo = {
      _id,
      role,
    };
    //[+] attach user info in token to  Request Object
    //?? ( carry out appropriate casting )
    (req as CustomRequest).user = userInfo;
  } catch (e) {
    //!! Make sure you return auth failure , in case

    throw CustomErrorHandler.userAuthFailed('J.W.T Invalid');
  }

  next();
};

export default auth;

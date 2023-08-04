import { NextFunction, Request, Response } from 'express';
import CustomErrorHandler from '../services/CustomErrorHandler';
import { CustomRequest } from './auth';

const admin = async (req: Request, _res: Response, next: NextFunction) => {
  const userInfo = (req as unknown as CustomRequest).user;

  console.log(userInfo);

  if (userInfo.role !== 'admin')
    throw CustomErrorHandler.userAuthFailed('User Not Admin');

  next();
};

export default admin;

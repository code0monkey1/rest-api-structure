import { NextFunction, Request, Response } from 'express';
import { CustomRequest } from '../../middlewares/auth';
import { UserModel } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';

const me = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { user } = req as CustomRequest;

  const foundUser = await UserModel.findById(user._id);
  console.log('🚀 ~ file: userController.ts:15 ~ foundUser:', foundUser);

  if (!foundUser) {
    next(CustomErrorHandler.notFound('User Not Found'));
  }

  res.json(foundUser);
};

export default {
  me,
};

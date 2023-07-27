import { Request, Response } from 'express';
import { UserModel } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import { hasUserAuth } from '../../src/types';

const me = async (req: Request, res: Response): Promise<void> => {
  if (!hasUserAuth(req))
    throw CustomErrorHandler.userAuthFailed('user not attached');

  const EXCLUDED_FIELDS = '-password -updatedAt -createdAt -__v';
  /*  The `select` method is used to
    specify which fields should be included or excluded from the result. In this case, the
    `-password -updatedAt -createdAt -__v` fields are excluded from the result. */
  const foundUser = await UserModel.findById(req.user._id).select(
    EXCLUDED_FIELDS
  );

  console.log('🚀 ~ file: userController.ts:15 ~ foundUser:', foundUser);

  if (!foundUser) throw CustomErrorHandler.notFound('User Not Found');

  res.json(foundUser);
};

export default {
  me,
};

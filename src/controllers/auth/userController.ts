import { Request, Response } from 'express';
import { UserModel } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import { hasUserAuth } from '../../types';

const me = async (req: Request, res: Response): Promise<void> => {
  //[+] Ensure that user Auth Info is present in the request object ,using a Type Guard

  if (!hasUserAuth(req))
    throw CustomErrorHandler.userAuthFailed('user not attached');

  //[+] Retrieve required user info , while removing the un-necessary fields
  const EXCLUDED_FIELDS = '-password -updatedAt -createdAt -__v';

  /*  The `select` method is used to
    specify which fields should be included or excluded from the result. In this case, the
    `-password -updatedAt -createdAt -__v` fields are excluded from the result. */

  const foundUser = await UserModel.findById(req.user._id).select(
    EXCLUDED_FIELDS
  );

  console.log('🚀 ~ file: userController.ts:15 ~ foundUser:', foundUser);
  //[+] If user not found - throw appropriate error
  if (!foundUser) throw CustomErrorHandler.notFound('User Not Found');

  //[+] Return user information

  res.json(foundUser);
};

export default {
  me,
};

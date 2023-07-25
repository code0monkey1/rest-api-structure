import { NextFunction, Request, Response } from 'express';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import { RegisterUserRequest, RegisterUserResponse } from '../../types';
import { registerSchema } from '../../validation';
const registerUser = async (
  req: Request<RegisterUserRequest>,
  res: Response<RegisterUserResponse>,
  next: NextFunction
) => {
  try {
    //Checklist

    //[ ] authorize the request
    const body = (await req.body) as RegisterUserRequest;

    const validatedData = registerSchema.parse(body);

    console.log('body', validatedData);

    //[ ] check if user is in database already

    const exists = await User.exists({ email: req.body.email });

    if (exists) {
      return next(
        CustomErrorHandler.alreadyExists('This email is already taken')
      );
    }
    // [ ] validate the request
    //[ ] prepare model
    //[ ] store in database
    //[ ] generate jwt
    // [ ] send response

    res.send({ message: 'valid' } as RegisterUserResponse);
  } catch (err) {
    // this will be caught by the errorHandler middleware
    return next(err);
  }
};

export default {
  registerUser,
};

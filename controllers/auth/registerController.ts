import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { RegisterUserRequest, RegisterUserResponse } from '../../types';
import validation from '../../validation';
const registerUser = (
  req: Request<RegisterUserRequest>,
  res: Response<RegisterUserResponse>,
  next: NextFunction
) => {
  //Checklist

  /* [ ] validate the request
     [ ] authorize the request
     [ ] check if user is in database already
     [ ] prepare model
     [ ] store in database
     [ ] generate jwt
     [ ] send response
   */
  try {
    const validatedData = validation.registrationSchema.parse(req.body);
    console.log('body', validatedData);

    res.send({ message: 'valid' });
  } catch (err) {
    let errorMessage = 'error: ';
    if (err instanceof ZodError) {
      errorMessage += err.issues
        .map((issue) => `${issue.path.join('.')} ${issue.message}`)
        .join(', ');
    }
    res.status(401).json({ message: errorMessage });
    next(err);
  }

  next();
};

export default {
  registerUser,
};

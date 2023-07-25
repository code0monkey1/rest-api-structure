import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
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

    // [ ] validate the request
    //[ ] prepare model
    //[ ] store in database
    //[ ] generate jwt
    // [ ] send response

    res.send({ message: 'valid' } as RegisterUserResponse);
  } catch (err) {
    let errorMessage = 'error: ';
    if (err instanceof ZodError) {
      errorMessage += err.issues
        .map((issue) => `${issue.path.join('.')} ${issue.message}`)
        .join(', ');
    }
    res.status(401).json({ message: errorMessage });
    next(errorMessage);
  }
};

export default {
  registerUser,
};

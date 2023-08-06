import { NextFunction, Request, Response } from 'express';
import { MulterError } from 'multer';
import { ZodError } from 'zod';
import { DEBUG_MODE } from '../config';
import CustomErrorHandler from '../services/CustomErrorHandler';

const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Error Finger Print
  console.error('---');
  console.error(`error name: ${error?.name}`);
  console.error(`errorHandler triggered: ${error.message}`);
  console.error('---');

  let statusCode = 500;

  let data = {
    message: 'Internal Server Error',
    /* The expression `...(DEBUG_MODE === 'true' && { originalError: err.message })` is using the
    spread syntax (`...`) to conditionally include an object in the `data` object. */
    ...(DEBUG_MODE === 'true' && { originalError: error.message }),
  };

  if (error instanceof CustomErrorHandler) {
    statusCode = error.status;
    data = {
      message: error.message,
    };
  } else if (error instanceof ZodError) {
    statusCode = 422;

    data = {
      message: error.issues
        .map((issue) => `${issue.path.join('.')} ${issue.message}`)
        .join(', '),
    };
  } else if (error instanceof MulterError) {
    // A Multer error occurred when uploading.
    statusCode = 422;
    data = { message: 'Multer Error' + error.message };
  }
  // An unknown error occurred when uploading.
  return res.status(statusCode).json(data);
};

export default errorHandler;

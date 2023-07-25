import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { DEBUG_MODE } from '../config';
const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;

  let data = {
    message: 'Internal Server Error',
    /* The expression `...(DEBUG_MODE === 'true' && { originalError: err.message })` is using the
    spread syntax (`...`) to conditionally include an object in the `data` object. */
    ...(DEBUG_MODE === 'true' && { originalError: err.message }),
  };

  if (err instanceof ZodError) {
    /* The line `statusCode = 422;` is assigning the value 422 to the variable `statusCode`. This
    variable is used to determine the HTTP status code that will be sent in the response. In this
    case, if the error is an instance of `ZodError`, the status code will be set to 422
    (Unprocessable Entity). */
    statusCode = 422;

    data = {
      message: err.issues
        .map((issue) => `${issue.path.join('.')} ${issue.message}`)
        .join(', '),
    };
  }

  res.json(data).status(statusCode);
};

export default errorHandler;

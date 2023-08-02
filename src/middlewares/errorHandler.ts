import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { DEBUG_MODE } from '../config';

/**
 * The `errorHandler` function handles errors and sends an appropriate response with a status code and
 * error message.
 * @param {Error} err - The `err` parameter is an instance of the `Error` class, which represents an
 * error that occurred during the execution of code. It contains information about the error, such as
 * the error message and stack trace.
 * @param {Request} _req - The `_req` parameter represents the incoming HTTP request object. It
 * contains information about the request, such as the request method, headers, URL, and body.
 * @param {Response} res - The `res` parameter is an object representing the HTTP response that will be
 * sent back to the client. It is used to send the response data, such as the JSON data and the HTTP
 * status code.
 * @param {NextFunction} _next - The `_next` parameter is a function that represents the next
 * middleware function in the request-response cycle. It is used to pass control to the next middleware
 * function.
 */

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

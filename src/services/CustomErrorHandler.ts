class CustomErrorHandler extends Error {
  constructor(public status: number, public message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  /**
   * The function returns a new instance of a custom error handler with a status code of 409 and a
   * given error message.
   * @param {string} message - The `message` parameter is a string that represents the error message to
   * be displayed.
   * @returns A new instance of the CustomErrorHandler class with a status code of 409 and the provided
   * message.
   */
  static alreadyExists(message: string) {
    return new CustomErrorHandler(409, message);
  }

  /**
   * The function returns a custom error handler with a 401 status code and a message indicating that
   * the user authentication failed due to an invalid password or email.
   * @param [message=password or email invalid] - The message parameter is a string that represents the
   * error message to be displayed when the user authentication fails. By default, the message is set
   * to 'password or email invalid'.
   * @returns A new instance of the CustomErrorHandler class with a status code of 401 and a message of
   * "password or email invalid".
   */
  static userAuthFailed(message = 'missing or invalid jwt') {
    /* The line `return new CustomErrorHandler(401, message);` is creating a new instance of the
  `CustomErrorHandler` class with a status code of 401 and the provided error message. This instance
  is then returned by the `wrongUserCredentials` static method. */
    return new CustomErrorHandler(401, message);
  }

  /**
   * The function returns a custom error handler with a 401 status code and a message indicating
   * invalid password or email.
   * @param [message=password or email invalid] - The message parameter is a string that represents the
   * error message to be displayed when the user credentials are invalid. The default value is
   * 'password or email invalid'.
   * @returns a new instance of the CustomErrorHandler class with a status code of 401 and a message of
   * "password or email invalid".
   */
  static wrongCredentials(message = 'password or email invalid') {
    return new CustomErrorHandler(401, message);
  }

  static notFound(message = 'Not Found') {
    return new CustomErrorHandler(404, message);
  }

  static unAuthorized(message = 'auth failed') {
    return new CustomErrorHandler(401, message);
  }

  static multerError(message = 'Multer File Upload Error') {
    return new CustomErrorHandler(401, message);
  }
}

export default CustomErrorHandler;

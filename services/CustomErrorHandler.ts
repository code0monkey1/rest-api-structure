class CustomErrorHandler extends Error {
  constructor(public status: number, public message: string) {
    super();
  }

  static alreadyExists(message: string) {
    /* The line `return new CustomErrorHandler(409, message);` is creating a new instance of the
    `CustomErrorHandler` class with a status code of 409 and a message provided as an argument. It
    is then returning this new instance of the `CustomErrorHandler` class. */

    /* The number `409` in this context is a status code that represents
    a conflict error. It indicates that the request could not be
    completed due to a conflict with the current state of the target
    resource. */
    return new CustomErrorHandler(409, message);
  }

  static userAuthFailed(message = 'password or email invalid') {
    /* The line `return new CustomErrorHandler(401, message);` is creating a new instance of the
    `CustomErrorHandler` class with a status code of 401 and a message of "password or email
    invalid". It is then returning this new instance of the `CustomErrorHandler` class. */

    /* The number `401` in this context is a status code that represents
    an unauthorized error. It indicates that the request requires user
    authentication, but the provided credentials (password or email)
    are invalid. */

    return new CustomErrorHandler(401, message);
  }

  static wrongUserCredentials(message = 'password or email invalid') {
    /* The line `return new CustomErrorHandler(401, message);` is creating a new instance of the
    `CustomErrorHandler` class with a status code of 401 and a message of "password or email
    invalid". It is then returning this new instance of the `CustomErrorHandler` class. */

    /* The number `401` in this context is a status code that represents
    an unauthorized error. It indicates that the request requires user
    authentication, but the provided credentials (password or email)
    are invalid. */

    return new CustomErrorHandler(401, message);
  }
}

export default CustomErrorHandler;

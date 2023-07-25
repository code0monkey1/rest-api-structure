class CustomErrorHandler extends Error {
  constructor(public status: number, public message: string) {
    super();
  }

  static alreadyExists(message: string) {
    return new CustomErrorHandler(409, message);
  }
}

export default CustomErrorHandler;

import * as bcrypt from 'bcrypt';

class Encryption {
  /**
   * The function compares a hashed token with a provided token and returns a boolean indicating
   * whether they match.
   * @param {string} hashedToken - The `hashedToken` parameter is a string that represents a token that
   * has been hashed using a cryptographic algorithm. This is typically used for security purposes,
   * such as storing passwords securely in a database.
   * @param {string} providedToken - The `providedToken` parameter is the token that is being provided
   * by the user or client. It is the token that needs to be compared with the hashed token to check if
   * they match.
   * @returns a Promise that resolves to a boolean value.
   */
  static async isMatch(
    hashedToken: string,
    providedToken: string
  ): Promise<boolean> {
    const match = await bcrypt.compare(hashedToken, providedToken);

    return match;
  }

  /**
   * The function takes a token as input, hashes it using bcrypt with a specified number of salt
   * rounds, and returns the hashed token.
   * @param {string} token - The `token` parameter is a string that represents the token that needs to
   * be hashed.
   * @returns a Promise that resolves to a string, which is the hashed token.
   */

  static async getHashedToken(token: string): Promise<string> {
    if (typeof token !== 'string') {
      throw new Error();
    }
    const SALT_ROUNDS = 10;

    const hashedToken = await bcrypt.hash(token, SALT_ROUNDS);

    return hashedToken;
  }
}

export default Encryption;

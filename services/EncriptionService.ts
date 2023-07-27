import * as bcrypt from 'bcrypt';

class Encryption {
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
    const SALT_ROUNDS = 10;

    const hashedToken = await bcrypt.hash(token, SALT_ROUNDS);

    return hashedToken;
  }
}

export default Encryption;

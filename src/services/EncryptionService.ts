import * as bcrypt from 'bcrypt';

/* The `EncryptionService` class is providing methods for encrypting and comparing data using the
bcrypt library. */
class EncryptionService {
  static async isMatch(data: string, encrypted: string): Promise<boolean> {
    const match = await bcrypt.compare(data, encrypted);

    return match;
  }
  static async getHashedToken(token: string): Promise<string> {
    if (typeof token !== 'string') {
      throw new Error();
    }
    const SALT_ROUNDS = 10;

    const hashedToken = await bcrypt.hash(token, SALT_ROUNDS);

    return hashedToken;
  }
}

export default EncryptionService;

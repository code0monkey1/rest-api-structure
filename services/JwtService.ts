import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

class JwtService {
  // eslint-disable-next-line @typescript-eslint/require-await
  static async sign(
    payload: string | object,
    expiry = '60s',
    secret = JWT_SECRET as string
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }

  verify = () => {};
}

export default JwtService;

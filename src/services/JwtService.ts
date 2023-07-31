import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
interface TokenData {
  _id: string;
  role: string;
}

class JwtService {
  // eslint-disable-next-line @typescript-eslint/require-await
  static async sign(
    payload: { _id: string; role: string },
    expiry = '60s',
    secret = JWT_SECRET!
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }

  static verify(token: string, secret = JWT_SECRET!): TokenData {
    return jwt.verify(token, secret) as TokenData;
  }
}

export default JwtService;

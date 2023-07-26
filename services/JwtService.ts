import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

class JwtService {
  // eslint-disable-next-line @typescript-eslint/require-await
  static async sign(
    payload: { _id: string; role: string },
    expiry = '60s',
    secret = JWT_SECRET as string
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }

  // static async verify(email: string, password: string) {
  //   // const match = await bcrypt;
  // }
}

export default JwtService;

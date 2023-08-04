import { Request, Response } from 'express';
import { REFRESH_TOKEN_SECRET } from '../../config';
import { destructureToken } from '../../middlewares/auth';
import { RefreshToken, User } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import JwtService from '../../services/JwtService';
import { refreshTokenValidator } from '../../validation';

export interface IRefreshToken {
  refresh_token: string;
}

const refresh = async (req: Request<IRefreshToken>, res: Response) => {
  // [+]Validate Request

  const body: unknown = await req.body;

  const data: IRefreshToken = refreshTokenValidator.parse(body);

  //[+] Find Refresh Token in DB

  const storedRefreshToken = await RefreshToken.findOne({
    token: data.refresh_token,
  });

  if (!storedRefreshToken)
    throw CustomErrorHandler.unAuthorized('Refresh Token not found in DB');

  //[+] Destructure refresh token

  const { _id } = destructureToken(
    storedRefreshToken.token,
    REFRESH_TOKEN_SECRET
  );

  // [+] Check if user is in the db

  const user = await User.findById(_id);

  if (!user) throw CustomErrorHandler.unAuthorized('User Not Found');

  //[+] generate jwt

  const tokenInfo = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    _id: user.id,
    role: user.role,
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const access_token = await JwtService.sign(tokenInfo);

  //[+] create refresh token
  const refresh_token = await JwtService.sign(
    tokenInfo,
    '1y',
    REFRESH_TOKEN_SECRET
  );

  //[+] save refresh token to db

  await RefreshToken.create({ token: refresh_token });

  //[-] ? ? What about the extra refresh tokens ( delete them ?? )

  // [+] send response

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  res.send({ message: 'valid', access_token, refresh_token });
};

export default {
  refresh,
};

export interface TokenData {
  _id: string;
  role: string;
}

interface JwtSignParams {
  payload: TokenData;
  _expiry?: string;
  secret?: string;
}

export interface IJwtService {
  sign: (params: JwtSignParams) => string;
  verify: (token: string, secret?: string) => TokenData;
}

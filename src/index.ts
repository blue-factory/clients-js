import AuthenticationAPI, {
  TAuthentication,
  TAuthenticationResponse,
  TAuthenticationVerifyTokenResponse,
  TAuthenticationVerifyToken,
} from './authentication';

import UsersAPI, { TUser, TUserResponse } from './user';

// TError ...
export type TError = {
  code: number;
  message: string;
};

// define classic grpc response
export type TErrorResponse = {
  error: TError | null;
  meta?: any;
};

// define method to promisify grpc function
export const promisify = (client: any, name: string): Function => (req: any): Promise<any> =>
  new Promise((resolve, reject) => {
    client[name](req, (err: Error, data: any) => (err ? reject(err) : resolve(data)));
  });

export {
  AuthenticationAPI,
  TAuthentication,
  TAuthenticationResponse,
  TAuthenticationVerifyTokenResponse,
  TAuthenticationVerifyToken,
  UsersAPI,
  TUser,
  TUserResponse,
};

import AuthenticationAPI, { TAuthentication, TAuthenticationResponse, TAuthenticationVerifyTokenResponse, TAuthenticationVerifyToken } from './authentication';
import UsersAPI, { TUser } from './user';
export declare type TError = {
    code: number;
    message: string;
};
export declare type TErrorResponse = {
    error: TError | null;
    meta?: any;
};
export declare const promisify: (client: any, name: string) => Function;
export { AuthenticationAPI, TAuthentication, TAuthenticationResponse, TAuthenticationVerifyTokenResponse, TAuthenticationVerifyToken, UsersAPI, TUser, };

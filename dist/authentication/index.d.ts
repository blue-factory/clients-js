import { TUser } from '../user';
import { TErrorResponse } from '../';
export declare type TAuthenticationResponse = TErrorResponse & {
    data: TUser;
    meta: {
        token: string;
    };
};
export declare type TAuthenticationVerifyTokenResponse = TErrorResponse & {
    data: TAuthenticationVerifyToken;
    valid: boolean;
};
export declare type TAuthenticationVerifyToken = {
    iat: number;
    exp: number;
    userId: string;
};
export declare type TAuthentication = {
    id: string;
    userId: string;
    token: string;
    blacklist: boolean;
};
interface IAuthentication {
    config(opts: {
        host: string;
        port: string;
    }): void;
    verifyToken(token: string): Promise<TAuthenticationVerifyTokenResponse>;
    login(email: string, password: string): Promise<TAuthenticationResponse>;
    signUp(user: TUser): Promise<TAuthenticationResponse>;
}
declare class Authentication implements IAuthentication {
    client: any;
    constructor();
    config(opts: {
        host: string;
        port: string;
    }): void;
    verifyToken(token: string): Promise<TAuthenticationVerifyTokenResponse>;
    login(email: string, password: string): Promise<TAuthenticationResponse>;
    signUp(user: TUser): Promise<TAuthenticationResponse>;
}
declare const _default: Authentication;
export default _default;

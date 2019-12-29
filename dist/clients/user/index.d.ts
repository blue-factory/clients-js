import { TErrorResponse } from '../';
export declare type TUser = {
    id?: string;
    name: string;
    email: string;
    password: string;
    createdAt?: string;
    updatedAt?: string;
};
export declare type TUserResponse = TErrorResponse & {
    data: TUser;
};
export declare type TUserVerifyPasswordResponse = TErrorResponse & {
    valid: boolean;
};
interface IUser {
    config(opts: {
        host: string;
        port: string;
    }): void;
    get(id: string): Promise<TUserResponse>;
    getByEmail(email: string): Promise<TUserResponse>;
    create(user: TUser): Promise<TUserResponse>;
    verifyPassword(email: string, password: string): Promise<TUserVerifyPasswordResponse>;
}
declare class User implements IUser {
    client: any;
    constructor();
    config(opts: {
        host: string;
        port: string;
    }): void;
    get(id: string): Promise<TUserResponse>;
    getByEmail(email: string): Promise<TUserResponse>;
    create(user: TUser): Promise<TUserResponse>;
    verifyPassword(email: string, password: string): Promise<TUserVerifyPasswordResponse>;
}
declare const _default: User;
export default _default;

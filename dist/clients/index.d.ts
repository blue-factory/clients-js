export declare type TError = {
    code: number;
    message: string;
};
export declare type TErrorResponse = {
    error: TError | null;
    meta?: any;
};

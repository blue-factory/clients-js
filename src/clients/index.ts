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


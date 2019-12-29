import grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';

// types
import { TUser } from '../user';
import { TErrorResponse, promisify } from '../';

// define classic grpc response
export type TAuthenticationResponse = TErrorResponse & {
  data: TUser;
  meta: {
    token: string;
  };
};

// TAuthenticationVerifyTokenResponse ...
export type TAuthenticationVerifyTokenResponse = TErrorResponse & {
  data: TAuthenticationVerifyToken;
  valid: boolean;
};

// TAuthenticationVerifyToken
export type TAuthenticationVerifyToken = {
  iat: number;
  exp: number;
  userId: string;
};

// define authentication message
export type TAuthentication = {
  id: string;
  userId: string;
  token: string;
  blacklist: boolean;
};

// IAuthentication define class ...
interface IAuthentication {
  config(opts: { host: string; port: string }): void;
  verifyToken(token: string): Promise<TAuthenticationVerifyTokenResponse>;
  login(email: string, password: string): Promise<TAuthenticationResponse>;
  signUp(user: TUser): Promise<TAuthenticationResponse>;

  // TODO(ca): below methods are not implemented
  //
  //   select(): Promise<any>
  //   update(id, data): Promise<any>
  //   delete(id): Promise<any>
}

//
// There explain that it is less more expensive to have a single communication
// with the server than to make a connection for every request made to the API.
// see: https://stackoverflow.com/questions/49244039/go-grpc-simple-service-asynchronous-and-synchronous-explanation#answers
//
class Authentication implements IAuthentication {
  client: any;

  // singleton class not use constructor method
  constructor() {}

  // config configure singleton class
  config(opts: { host: string; port: string }): void {
    const protoPath = __dirname + `/../../../proto/demo.proto`;

    const packageDefinition = protoLoader.loadSync(protoPath, {
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });

    const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
    const { proto }: any = protoDescriptor;
    this.client = new proto.AuthService(`${opts.host}:${opts.port}`, grpc.credentials.createInsecure());
  }

  /**
   *
   * message AuthVerifyTokenRequest {
   * 	string token = 1;
   * }
   *
   * message AuthVerifyTokenResponse {
   * 	bool valid = 1;
   * 	Error error = 2;
   * }
   *
   */
  verifyToken(token: string): Promise<TAuthenticationVerifyTokenResponse> {
    if (token === undefined) {
      return Promise.reject(new Error('invalid token param'));
    }

    return promisify(this.client, 'verifyToken')({ token });
  }

  /**
   *
   * message AuthLoginRequest {
   *  string email = 1;
   *  string password = 2;
   * }
   *
   * message AuthLoginResponse {
   *  User data = 1;
   *  Token meta = 2;
   *  Error error = 3;
   * }
   *
   */
  login(email: string, password: string): Promise<TAuthenticationResponse> {
    if (email === undefined) {
      return Promise.reject(new Error('invalid email param'));
    }

    if (email === undefined) {
      return Promise.reject(new Error('invalid password param'));
    }

    return promisify(this.client, 'login')({ email, password });
  }

  /**
   *
   * message AuthSignupRequest {
   *  User user = 1;
   * }
   *
   * message AuthSignupResponse {
   *  User data = 1;
   *  Token meta = 2;
   *  Error error = 3;
   * }
   *
   */
  signUp(user: TUser): Promise<TAuthenticationResponse> {
    if (user === undefined) {
      return Promise.reject(new Error('invalid user param'));
    }

    const { name } = user;
    if (name === undefined) {
      return Promise.reject(new Error('invalid user.name param'));
    }

    const { email } = user;
    if (email === undefined) {
      return Promise.reject(new Error('invalid user.email param'));
    }

    const { password } = user;
    if (password === undefined) {
      return Promise.reject(new Error('invalid user.password param'));
    }

    return promisify(this.client, 'signUp')({ user });
  }
}

export default new Authentication();

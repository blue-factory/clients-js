import grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';

// types
import { TErrorResponse, promisify } from '../';

// define places history message
export type TPlaceHistory = {
  id: string;
  userId: string;
  latitude: string;
  longitude: string;
};

export type TMetaPageToken = {
  pageToken: string;
};

// define places history response message
export type TPlaceHistoryResponse = TErrorResponse & {
  data: TPlaceHistory[];
};

// IPlaceHistory define class ...
interface IPlaceHistory {
  config(opts: { host: string; port: string }): void;
  listByUserId(userId: string): Promise<TPlaceHistoryResponse>;
}

//
// There explain that it is less more expensive to have a single communication
// with the server than to make a connection for every request made to the API.
// see: https://stackoverflow.com/questions/49244039/go-grpc-simple-service-asynchronous-and-synchronous-explanation#answers
//

/*
 * message PlaceHistory {
 *  string id = 1;
 *  string user_id = 2;
 *  string latitude = 3;
 *  string longitude = 4;
 *  int64 created_at = 5;
 *  int64 updated_at = 6;
 * }
 */
class PlaceHistory implements IPlaceHistory {
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
    this.client = new proto.PlaceHistoryService(`${opts.host}:${opts.port}`, grpc.credentials.createInsecure());
  }

  /**
   *
   * message PlaceHistoryListByUserIdRequest {
   *  string user_id = 1;
   * }
   *
   * message PlaceHistoryListByUserIdResponse {
   *  repeated PlaceHistory data = 1;
   *  Meta meta = 2;
   *  Error error = 3;
   * }
   *
   */
  listByUserId(userId: string): Promise<TPlaceHistoryResponse> {
    if (userId === undefined) {
      return Promise.reject(new Error('invalid userId'));
    }

    return promisify(this.client, 'listPlaceHistoryByUserId')({ userId });
  }
}

export default new PlaceHistory();

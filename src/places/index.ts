import grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';

// types
import { TErrorResponse, promisify } from '../';

export type TCoord = {
  latitude: string;
  longitude: string;
};

// define place message
export type TPlace = {
  id: string;
  name: string;
  rating: string;
  address: string;
  open: boolean;
  photoReference: string;
  coord: TCoord;
};

export type TMetaPageToken = {
  pageToken: string;
};

// define place response message
export type TPlaceResponse = TErrorResponse & {
  data: TPlace[];
  meta: TMetaPageToken;
};

// IPlace define class ...
interface IPlace {
  config(opts: { host: string; port: string }): void;
  listByCoord(coord: TCoord, pageToken: string): Promise<TPlaceResponse>;
}

//
// There explain that it is less more expensive to have a single communication
// with the server than to make a connection for every request made to the API.
// see: https://stackoverflow.com/questions/49244039/go-grpc-simple-service-asynchronous-and-synchronous-explanation#answers
//
class Place implements IPlace {
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
    this.client = new proto.PlaceService(`${opts.host}:${opts.port}`, grpc.credentials.createInsecure());
  }

  /**
   *
   * message PlaceListByCoordRequest {
   *  Coord coord = 1;
   *  string page_token = 2;
   * }
   *
   * message MetaPlaceListByCoord {
   *  string page_token = 1;
   * }
   *
   * message PlaceListByCoordResponse {
   *  repeated Place data = 1;
   *  MetaPlaceListByCoord meta = 2;
   *  Error error = 3;
   * }
   *
   */
  listByCoord(coord: TCoord, userId: string): Promise<TPlaceResponse> {
    if (coord === undefined) {
      return Promise.reject(new Error('invalid coord param'));
    }

    if (coord.latitude === undefined) {
      return Promise.reject(new Error('invalid coord.latitude param'));
    }

    if (userId === undefined) {
      return Promise.reject(new Error('invalid userId'));
    }

    return promisify(this.client, 'listByCoord')({ coord, userId });
  }
}

export default new Place();

import { TErrorResponse } from '../';
export declare type TCoord = {
    latitude: string;
    longitude: string;
};
export declare type TPlace = {
    id: string;
    name: string;
    rating: string;
    address: string;
    open: boolean;
    photoReference: string;
    coord: TCoord;
};
export declare type TMetaPageToken = {
    pageToken: string;
};
export declare type TPlaceResponse = TErrorResponse & {
    data: TPlace[];
    meta: TMetaPageToken;
};
interface IPlace {
    config(opts: {
        host: string;
        port: string;
    }): void;
    listByCoord(coord: TCoord, pageToken: string): Promise<TPlaceResponse>;
}
declare class Place implements IPlace {
    client: any;
    constructor();
    config(opts: {
        host: string;
        port: string;
    }): void;
    listByCoord(coord: TCoord, userId: string): Promise<TPlaceResponse>;
}
declare const _default: Place;
export default _default;

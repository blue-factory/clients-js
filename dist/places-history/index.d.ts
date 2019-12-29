import { TErrorResponse } from '../';
export declare type TPlaceHistory = {
    id: string;
    userId: string;
    latitude: string;
    longitude: string;
};
export declare type TMetaPageToken = {
    pageToken: string;
};
export declare type TPlaceHistoryResponse = TErrorResponse & {
    data: TPlaceHistory[];
};
interface IPlaceHistory {
    config(opts: {
        host: string;
        port: string;
    }): void;
    listByUserId(userId: string): Promise<TPlaceHistoryResponse>;
}
declare class PlaceHistory implements IPlaceHistory {
    client: any;
    constructor();
    config(opts: {
        host: string;
        port: string;
    }): void;
    listByUserId(userId: string): Promise<TPlaceHistoryResponse>;
}
declare const _default: PlaceHistory;
export default _default;

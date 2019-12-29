"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_1 = __importDefault(require("grpc"));
const protoLoader = __importStar(require("@grpc/proto-loader"));
const __1 = require("../");
class Place {
    constructor() { }
    config(opts) {
        const protoPath = __dirname + `/../../../proto/demo.proto`;
        const packageDefinition = protoLoader.loadSync(protoPath, {
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        });
        const protoDescriptor = grpc_1.default.loadPackageDefinition(packageDefinition);
        const { proto } = protoDescriptor;
        this.client = new proto.PlaceService(`${opts.host}:${opts.port}`, grpc_1.default.credentials.createInsecure());
    }
    listByCoord(coord, userId) {
        if (coord === undefined) {
            return Promise.reject(new Error('invalid coord param'));
        }
        if (coord.latitude === undefined) {
            return Promise.reject(new Error('invalid coord.latitude param'));
        }
        if (userId === undefined) {
            return Promise.reject(new Error('invalid userId'));
        }
        return __1.promisify(this.client, 'listByCoord')({ coord, userId });
    }
}
exports.default = new Place();

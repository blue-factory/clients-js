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
const promisify_1 = __importDefault(require("../../util/promisify"));
class User {
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
        this.client = new proto.UserService(`${opts.host}:${opts.port}`, grpc_1.default.credentials.createInsecure());
    }
    get(id) {
        if (id === undefined) {
            return Promise.reject(new Error('invalid id param'));
        }
        return promisify_1.default(this.client, 'userGet')({ user_id: id });
    }
    getByEmail(email) {
        if (email === undefined) {
            return Promise.reject(new Error('invalid email param'));
        }
        return promisify_1.default(this.client, 'userGetByEmail')({ email });
    }
    create(user) {
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
        return promisify_1.default(this.client, 'userCreate')({ data: user });
    }
    verifyPassword(email, password) {
        if (email === undefined) {
            return Promise.reject(new Error('invalid email param'));
        }
        if (password === undefined) {
            return Promise.reject(new Error('invalid password param'));
        }
        return promisify_1.default(this.client, 'userVerifyPassword')({ email, password });
    }
}
exports.default = new User();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = __importDefault(require("./authentication"));
exports.AuthenticationAPI = authentication_1.default;
const user_1 = __importDefault(require("./user"));
exports.UsersAPI = user_1.default;
exports.promisify = (client, name) => (req) => new Promise((resolve, reject) => {
    client[name](req, (err, data) => (err ? reject(err) : resolve(data)));
});

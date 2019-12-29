"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promisify = (client, name) => (req) => new Promise((resolve, reject) => {
    client[name](req, (err, data) => (err ? reject(err) : resolve(data)));
});
exports.default = promisify;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INTERNAL_SERVER_ERROR = exports.TOO_MANY_REQUESTS = exports.UNPROCESSABLE_CONTENT = exports.CONFLICT = exports.NOT_FOUND = exports.FORBIDDEN = exports.UNAUTHORIZED = exports.BAD_REQUEST = exports.CREATED = exports.OK = void 0;
// 2xx Success
exports.OK = 200; // Everything went well, and the request worked.
exports.CREATED = 201; // New data was created (like a new user).
// 4xx Client Errors
exports.BAD_REQUEST = 400; // The request is wrong or missing something.
exports.UNAUTHORIZED = 401; // You need to log in to access this.
exports.FORBIDDEN = 403; // You don’t have permission to do this.
exports.NOT_FOUND = 404; // The thing you are looking for doesn’t exist.
exports.CONFLICT = 409; // There’s a problem (e.g., a user already exists).
exports.UNPROCESSABLE_CONTENT = 422; // The data is wrong and can’t be used.
exports.TOO_MANY_REQUESTS = 429; // You’ve made too many requests too quickly.
// 5xx Server Errors
exports.INTERNAL_SERVER_ERROR = 500; // Something went wrong on the server.

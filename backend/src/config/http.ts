// 2xx Success
export const OK = 200; // Everything went well, and the request worked.
export const CREATED = 201; // New data was created (like a new user).

// 4xx Client Errors
export const BAD_REQUEST = 400; // The request is wrong or missing something.
export const UNAUTHORIZED = 401; // You need to log in to access this.
export const FORBIDDEN = 403; // You don’t have permission to do this.
export const NOT_FOUND = 404; // The thing you are looking for doesn’t exist.
export const CONFLICT = 409; // There’s a problem (e.g., a user already exists).
export const UNPROCESSABLE_CONTENT = 422; // The data is wrong and can’t be used.
export const TOO_MANY_REQUESTS = 429; // You’ve made too many requests too quickly.

 // 5xx Server Errors
export const INTERNAL_SERVER_ERROR = 500; // Something went wrong on the server.
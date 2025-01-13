"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const authMiddleware = (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header) {
        res.status(401).json({ message: "Authorization header missing" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(header, config_1.JWT_SECRET);
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            // Handle JWT-specific errors (e.g., invalid signature)
            res.status(403).json({
                error: "Invalid or expired token",
                details: error.message,
            });
        }
        // Handle any other unexpected errors
        res.status(500).json({
            error: "Internal server error",
        });
    }
};
exports.authMiddleware = authMiddleware;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.register = void 0;
const zod_1 = require("zod");
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
const register = async (req, res) => {
    try {
        // validation
        const { name, email, password } = registerSchema.parse(req.body);
        const existingUser = await user_model_1.User.findOne({ email });
        if (existingUser) {
            res.status(409).json({
                message: "User already exists with this email",
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await user_model_1.User.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = jsonwebtoken_1.default.sign({
            id: user?._id,
        }, config_1.JWT_SECRET);
        res.status(200).json({
            message: "User registered successfully",
            token,
        });
        // return response
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({
                message: "Validation error",
                error: error.errors,
            });
        }
        else {
            res.status(500).json({
                message: "Internal server error",
            });
        }
    }
};
exports.register = register;
const signin = async (req, res) => {
    try {
        const { email, password } = registerSchema.parse(req.body);
        const existingUser = await user_model_1.User.findOne({ email });
        const passwordHashed = existingUser?.password;
        if (!passwordHashed) {
            res.status(401).json({
                error: "Unauthorized", // this can be used as a key indicating the type of error
                message: "Invalid credentials",
            });
            return;
        }
        if (!existingUser) {
            res.status(404).json({
                error: "Not Found", // this can indicate that the user was not found
                message: "User not found",
            });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, passwordHashed);
        if (!isPasswordValid) {
            res.status(401).json({
                error: "Unauthorized",
                message: "Invalid credentials",
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: existingUser?._id,
        }, config_1.JWT_SECRET);
        res.status(200).json({
            message: "User signin successful",
            token,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({
                message: "Validation error",
                error: error.errors,
            });
        }
        else {
            res.status(500).json({
                message: "Internal server error",
            });
        }
    }
};
exports.signin = signin;

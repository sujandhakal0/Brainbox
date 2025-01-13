"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contentSchema = new mongoose_1.default.Schema({
    type: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    link: String,
    tags: [String],
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "User", required: true },
}, {
    timestamps: true,
});
exports.Content = mongoose_1.default.model("Content", contentSchema);

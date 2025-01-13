"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const content_routes_1 = __importDefault(require("./routes/content.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.status(200).json({
        status: "Status is healthy",
    });
});
app.use("/auth", auth_routes_1.default);
app.use("/content", content_routes_1.default);
app.listen(config_1.PORT, async () => {
    console.log(`Server is running on http://localhost:${config_1.PORT}`);
});

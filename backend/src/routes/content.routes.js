"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const content_controllers_1 = require("../controllers/content.controllers");
const authMiddlware_1 = require("../middlewares/authMiddlware");
const contentRoutes = (0, express_1.Router)();
contentRoutes.post("/create", authMiddlware_1.authMiddleware, content_controllers_1.createContent);
contentRoutes.get("/", authMiddlware_1.authMiddleware, content_controllers_1.getContent);
contentRoutes.delete("/:contentId", authMiddlware_1.authMiddleware, content_controllers_1.deleteContent);
// share content
contentRoutes.post("/share", authMiddlware_1.authMiddleware, content_controllers_1.createShareLink);
contentRoutes.get("/share/:link", authMiddlware_1.authMiddleware, content_controllers_1.shareLink);
// prefix: /content
exports.default = contentRoutes;

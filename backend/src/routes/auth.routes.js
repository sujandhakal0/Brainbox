"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controllers_1 = require("../controllers/auth.controllers");
const authRoutes = (0, express_1.Router)();
authRoutes.post('/register', auth_controllers_1.register);
authRoutes.post('/signin', auth_controllers_1.signin);
// prefix: /auth
exports.default = authRoutes;

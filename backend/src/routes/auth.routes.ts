import { Router } from "express";
import { register, signin } from "../controllers/auth.controllers";

const authRoutes = Router()
authRoutes.post('/register', register)
authRoutes.post('/signin', signin)
// prefix: /auth

export default authRoutes
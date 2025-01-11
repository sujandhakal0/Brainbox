import { Router } from "express";
import {
  createContent,
  deleteContent,
  getContent,
} from "../controllers/content.controllers";
import { authMiddleware } from "../middlewares/authMiddlware";

const contentRoutes = Router();

contentRoutes.post("/createContent", authMiddleware, createContent);
contentRoutes.post("/getContent", authMiddleware, getContent);
contentRoutes.post("/deleteContent", authMiddleware, deleteContent);

// prefix: /content

export default contentRoutes;

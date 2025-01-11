import { Router } from "express";
import {
  createContent,
  createShareLink,
  deleteContent,
  getContent,
  shareLink,
} from "../controllers/content.controllers";
import { authMiddleware } from "../middlewares/authMiddlware";

const contentRoutes = Router();

contentRoutes.post("/create", authMiddleware, createContent);
contentRoutes.get("/", authMiddleware, getContent);
contentRoutes.delete("/:contentId", authMiddleware, deleteContent);

// share content
contentRoutes.post("/share", authMiddleware, createShareLink);
contentRoutes.get("/share/:link", authMiddleware, shareLink);

// prefix: /content

export default contentRoutes;

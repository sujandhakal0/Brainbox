import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"] as string;
  if (!header) {
    res.status(401).json({ message: "Authorization header missing" });
  }

  try {
    const decoded = jwt.verify(header, JWT_SECRET);

    //@ts-ignore
    req.userId = decoded.id;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
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

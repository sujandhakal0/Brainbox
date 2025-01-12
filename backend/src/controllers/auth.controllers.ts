import { Request, Response } from "express";
import { z } from "zod";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import bcrypt from "bcrypt";

const registerSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string(),
});

export const register = async (req: Request, res: Response) => {
  try {
    // validation
    const { name, email, password } = registerSchema.parse(req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user?._id,
      },
      JWT_SECRET
    );

    res.status(200).json({
      message: "User registered successfully",
      token,
    });

    // return response
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: "Validation error",
        error: error.errors,
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = registerSchema.parse(req.body);

    const existingUser = await User.findOne({ email });
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

    const isPasswordValid = await bcrypt.compare(password, passwordHashed);
    if (!isPasswordValid) {
      res.status(401).json({
        error: "Unauthorized",
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      {
        id: existingUser?._id,
      },
      JWT_SECRET
    );

    res.status(200).json({
      message: "User signin successful",
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: "Validation error",
        error: error.errors,
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
};

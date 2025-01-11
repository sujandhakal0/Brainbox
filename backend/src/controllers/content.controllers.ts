import { Request, Response } from "express";
import { Content } from "../models/content.models";

export const createContent = async (req: Request, res: Response) => {
  const { title, link } = req.body;

  //@ts-ignore
  const userId = req.userId;
  await Content.create({
    title,
    link,
    userId,
    tage: [],
  });

  res.status(200).json({
    message: "Content created successfully ",
  });
};

export const getContent = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.userId;

  const content = await Content.find({ userId }).populate("userId", "name");

  res.status(200).json({
    content,
  });
};

export const deleteContent = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.userId;
  const contentId = req.body.contentId;

  await Content.deleteMany({
    contentId,
    userId,
  });

  res.status(200).json({
    message:"Content deleted successfully"
  });
};

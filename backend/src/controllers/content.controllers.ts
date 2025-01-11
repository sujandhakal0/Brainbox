import { Request, Response } from "express";
import { Content } from "../models/content.models";
import { Share } from "../models/share.models";
import { random } from "../utils/utils";
import { User } from "../models/user.model";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const createContent = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { type, title, link, tags } = req.body;

    // Ensure the user is authenticated
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
    }

    // Validate required fields
    if (!type || !title) {
      res.status(400).json({ message: "Type and Title are required" });
    }

    // Create content with default handling for `tags`
    const content = await Content.create({
      type,
      title,
      link,
      userId: req.userId,
      tags: tags || [], // Use provided tags or default to an empty array
    });

    // Return success response
    res.status(201).json({
      message: "Content created successfully",
      content,
    });
  } catch (error) {
    // Return error response
    res.status(500).json({ message: "Error creating content", error });
  }
};

export const getContent = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.userId;

  const content = await Content.find({ userId }).populate("userId", "name");

  res.status(200).json({
    content,
  });
};

export const deleteContent = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { contentId } = req.params;

    // Ensure the user is authenticated
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
    }

    // Find the content by ID and ensure it belongs to the authenticated user
    const content = await Content.findOne({
      _id: contentId,
      userId: req.userId,
    });

    if (!content) {
      res.status(404).json({ message: "Content not found or unauthorized" });
    }

    // Delete the content
    await Content.deleteOne({ _id: contentId });

    // Return success response
    res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    // Return error response
    res.status(500).json({ message: "Error deleting content", error });
  }
};

// for Link sharing

// generate link
export const createShareLink = async (req: Request, res: Response) => {
  const { share } = req.body;
  const hash = random(10);

  //@ts-ignore
  const userId = req.userId;

  if (share) {
    await Share.create({
      userId,
      hash: hash,
    });
    res.status(200).json({
      message: `Content shared successfully.`,
      shareLink: `/share/content/${hash}`,
    });
  } else {
    await Share.deleteOne({
      userId,
    });
    res.status(200).json({
      message: "Share link removed successfully.",
    });
  }
};

// share link of content
export const shareLink = async (req: Request, res: Response) => {
  const hash = req.params.link;

  const link = await Share.findOne({
    hash,
  });

  if (!link) {
    res.status(411).json({
      message: "Incorrect Input",
    });
    return;
  }

  const content = await Content.find({
    userId: link.userId,
  });

  const user = await User.findById(link.userId);

  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }

  res.json({
    name: user.name,
    content,
  });
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareLink = exports.createShareLink = exports.deleteContent = exports.getContent = exports.createContent = void 0;
const content_models_1 = require("../models/content.models");
const share_models_1 = require("../models/share.models");
const utils_1 = require("../utils/utils");
const user_model_1 = require("../models/user.model");
const createContent = async (req, res) => {
    try {
        const { type, title, body, link, tags } = req.body;
        // Ensure the user is authenticated
        if (!req.userId) {
            res.status(401).json({ message: "Unauthorized" });
        }
        // Validate required fields
        if (!type || !title) {
            res.status(400).json({ message: "Type and Title are required" });
        }
        // Create content with default handling for `tags`
        const content = await content_models_1.Content.create({
            type,
            title,
            body,
            link,
            userId: req.userId,
            tags: tags || [],
        });
        // Return success response
        res.status(201).json({
            message: "Content created successfully",
            content,
        });
    }
    catch (error) {
        // Return error response
        res.status(500).json({ message: "Error creating content", error });
    }
};
exports.createContent = createContent;
const getContent = async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await content_models_1.Content.find({ userId }).populate("userId", "name");
    res.status(200).json({
        content,
    });
};
exports.getContent = getContent;
const deleteContent = async (req, res) => {
    try {
        const { contentId } = req.params;
        // Ensure the user is authenticated
        if (!req.userId) {
            res.status(401).json({ message: "Unauthorized" });
        }
        // Find the content by ID and ensure it belongs to the authenticated user
        const content = await content_models_1.Content.findOne({
            _id: contentId,
            userId: req.userId,
        });
        if (!content) {
            res.status(404).json({ message: "Content not found or unauthorized" });
        }
        // Delete the content
        await content_models_1.Content.deleteOne({ _id: contentId });
        // Return success response
        res.status(200).json({ message: "Content deleted successfully" });
    }
    catch (error) {
        // Return error response
        res.status(500).json({ message: "Error deleting content", error });
    }
};
exports.deleteContent = deleteContent;
// for Link sharing
// generate link
const createShareLink = async (req, res) => {
    const { share } = req.body;
    const hash = (0, utils_1.random)(10);
    //@ts-ignore
    const userId = req.userId;
    if (share) {
        await share_models_1.Share.create({
            userId,
            hash: hash,
        });
        res.status(200).json({
            message: `Content shared successfully.`,
            shareLink: `/share/content/${hash}`,
        });
    }
    else {
        await share_models_1.Share.deleteOne({
            userId,
        });
        res.status(200).json({
            message: "Share link removed successfully.",
        });
    }
};
exports.createShareLink = createShareLink;
// share link of content
const shareLink = async (req, res) => {
    const hash = req.params.link;
    const link = await share_models_1.Share.findOne({
        hash,
    });
    if (!link) {
        res.status(411).json({
            message: "Incorrect Input",
        });
        return;
    }
    const content = await content_models_1.Content.find({
        userId: link.userId,
    });
    const user = await user_model_1.User.findById(link.userId);
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
exports.shareLink = shareLink;

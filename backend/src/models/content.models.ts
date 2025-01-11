import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

export const Content = mongoose.model("Content", contentSchema);

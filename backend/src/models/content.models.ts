import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    link: String,
    tags: [String],
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

export const Content = mongoose.model("Content", contentSchema);

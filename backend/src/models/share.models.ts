import mongoose from "mongoose";

const shareSchema = new mongoose.Schema({
  hash: String,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

export const Share = mongoose.model("Share", shareSchema);

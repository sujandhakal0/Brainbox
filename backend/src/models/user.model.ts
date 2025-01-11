import mongoose from "mongoose";

export interface UserDocument  {
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<UserDocument>({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model<UserDocument>("User", userSchema);

import mongoose from "mongoose";
import { MONGO_URI } from "./config";

const connectDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://moonergone0:jpRdZ1BLRkWNr8sN@cluster0.5esvt.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Mongodb connected successfully");
  } catch (error) {
    console.log("MongoDb connection failed", error);
    process.exit(1);
  }
};
export default connectDatabase;

import mongoose from "mongoose"
import { MONGO_URI } from "./config";

const connectDatabase = async()=>{
try {
    await mongoose.connect(MONGO_URI);
    console.log("Mongodb connected successfully")
} catch (error) {
    console.log("MongoDb connection failed", error)
    process.exit(1)
}

}
export default connectDatabase;
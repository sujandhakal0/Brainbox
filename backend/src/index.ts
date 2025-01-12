import express from "express";
import { PORT } from "./config/config";
import cors from "cors";
import connectDatabase from "./config/db";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import contentRoutes from "./routes/content.routes";

connectDatabase();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Status is healthy",
  });
});
app.use("/auth", authRoutes);
app.use("/content", contentRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

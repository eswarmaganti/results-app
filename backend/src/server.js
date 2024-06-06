import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import resultsRouter from "./routes/results.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// connect to MongoDB

try {
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`*** Success: Successfully connected to MongoDB Server ***`);
} catch (err) {
  console.error(
    `*** Error: Failed to connect to MongoDB Server - ${err.message} ***`
  );
}

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/v1", resultsRouter);

app.use("*", (req, res) => {
  return res
    .status(404)
    .json({ message: "The Endpoint requested is not found", status: "error" });
});

const PORT = process.env.PORT || 6060;

app.listen(PORT, () => {
  console.log(`*** Success: Server Running on PORT:${PORT} ***`);
});

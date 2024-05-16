// Import required modules
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import blogRoute from "./routes/blogRoute.js";

//configure env
dotenv.config();

//databse config
connectDB();

// Create an Express application
const app = express();

// Define a port number
const PORT = process.env.PORT;

// Middleware to parse JSON request body
app.use(cors({
  origin: "https://news-dev-1.vercel.app/",
  // origin: "*",
}));
app.use(express.json());

// Define routes
app.get("/", (req, res) => {
  res.send("Hello World! This is my server.");
});
app.use("/api/auth", authRoute);
app.use("/api/blog", blogRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

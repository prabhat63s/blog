import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import blogRoute from "./routes/blogRoute.js";
import path from "path";


//configure env
dotenv.config();

//databse config
connectDB();

// Create an Express application
const app = express();

// Define a port number
const PORT = process.env.PORT || 5500;

const __dirname = path.resolve();

// Middleware to parse JSON request body
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());

// Define routes
app.use("/api/auth", authRoute);
app.use("/api/blog", blogRoute);


app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

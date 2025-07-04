import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./libs/db.js";
import { app, server } from "./libs/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json()); //Extract json data from body middleware
app.use(cookieParser()); //Allow to parse cookie
app.use(express.urlencoded({ extended: true })); //Middleware to parse URL-encoded data
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(`${process.env.API_VERSION}/auth`, authRoutes);
app.use(`${process.env.API_VERSION}/message`, messageRoutes);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist"))) //get static index.html of dist folder of application in frontend
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));//serve frontend application in same port
  })
}

server.listen(PORT, () => {
  console.log("Server is running on Port:", PORT);
  connectDB();
});

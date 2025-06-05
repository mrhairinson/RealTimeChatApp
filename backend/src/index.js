import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./libs/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000

app.use(express.json()) //Extract json data from body middleware
app.use(cookieParser()) //Allow to parse cookie
app.use(express.urlencoded({ extended: true })); //Middleware to parse URL-encoded data

app.use(`${process.env.API_VERSION}/auth`, authRoutes)
app.use(`${process.env.API_VERSION}/message`, messageRoutes)

app.listen(PORT, () => {
    console.log("Server is running on Port:", PORT);
    connectDB();
})
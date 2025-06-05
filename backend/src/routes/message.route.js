import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router()

router.get("/", protectRoute ,(req, res) => {
    res.status(200).json({ message: "This is a protected message route" })
})

//Fetch user
router.get("/user", protectRoute ,(req, res) => {
    res.status(200).json({ message: "This is a protected message route" })
})

export default router
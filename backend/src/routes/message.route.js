import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getUserForSideBar, getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router()

router.get("/", protectRoute ,(req, res) => {
    res.status(200).json({ message: "This is a protected message route" })
})

//Fetch user except current user
router.get("/users", protectRoute , getUserForSideBar)

//Fetch message for a chat
router.get("/:id", protectRoute , getMessages)

//Fetch message for a chat
router.post("/send/:id", protectRoute , sendMessage)

export default router
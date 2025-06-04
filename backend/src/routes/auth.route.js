import express from "express"
import { checkAuth, signin, signout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router()

router.post("/signup", signup)

router.post("/signin", signin)

router.post("/signout", signout)

router.get("/check-auth", protectRoute, checkAuth)

router.put("/update-profile", protectRoute, updateProfile)

export default router
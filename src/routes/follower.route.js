import { Router } from "express";
import { followAUser, followersOfAUser } from "../controllers/follower.controller.js";

const router = Router();

// Follower routes
router.route("/follow/:id").get(followAUser)
router.route("/userfollowers/:id").get(followersOfAUser)


export default router
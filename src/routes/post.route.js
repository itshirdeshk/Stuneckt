import { Router } from "express";
import { allPosts, createPost, getAllPostOfAUser } from "../controllers/post.controller.js";

const router = Router();

router.route("/createpost").post(createPost)
router.route("/myposts").get(getAllPostOfAUser)
router.route("/allposts").get(allPosts)
export default router
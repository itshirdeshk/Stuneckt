import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { getUserDetails, login, logout, newUser, updateUserDetails } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(
    newUser
);
router.route("/login").post(login);

router.use(isAuthenticated)
router.route("/getuserdetails").get(getUserDetails)
router.route("/updateUserDetails").put(updateUserDetails)
router.route("/logout").get(logout);


export default router;
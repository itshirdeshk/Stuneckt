import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js"
import followerRoute from "./routes/follower.route.js"
import { isAuthenticated } from "./middlewares/auth.middleware.js";

app.use("/api/v1/user", userRoute);

app.use(isAuthenticated);
app.use("/api/v1/post", postRoute)
app.use("/api/v1/follower", followerRoute)

export { app };
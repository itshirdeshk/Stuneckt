import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Added CORS(Cross Origin Resource Sharing) so that our backend is accessible by other origins i.e. frontend.
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Importing Routes 
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js"
import followerRoute from "./routes/follower.route.js"
import { isAuthenticated } from "./middlewares/auth.middleware.js";

app.use("/api/v1/user", userRoute);

// Added a "isAuthenticated" Middleware so that only a logged in user can access these routes.
app.use(isAuthenticated);
app.use("/api/v1/post", postRoute)
app.use("/api/v1/follower", followerRoute)

export { app };
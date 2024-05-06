import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiErrors.js";
import { Post } from "../models/post.model.js";

const createPost = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    if (title === "") throw new ApiError(400, "Title is required.")
    if (content === "") throw new ApiError(400, "Content is required.")

    const post = await Post.create({ title, content, user: req.user });

    if (!post) throw new ApiError(400, "An Error Occurred while creating post.")

    return res.status(200).json({
        success: true,
        post,
        message: "Post Created Successfully"
    })
})

const getAllPostOfAUser = asyncHandler(async (req, res) => {
    const userId = req.user;
    const { page = 1 } = req.query;

    const resultPerPage = 10;
    const skip = (page - 1) * resultPerPage;

    const [posts, totalPostsCount] = await Promise.all([Post.find({ user: userId }).sort({ createdAt: -1 })
        .skip(skip)
        .limit(resultPerPage)
        .lean(),
    Post.countDocuments({ user: userId })]);

    const totalPages = Math.ceil(totalPostsCount / resultPerPage) || 0;

    if (!posts) throw new ApiError(400, "No Posts found.")

    return res.status(200).json({
        success: true,
        posts,
        totalPages,
    });
})

const allPosts = asyncHandler(async (req, res) => {
    const { page = 1 } = req.query;

    const resultPerPage = 10;
    const skip = (page - 1) * resultPerPage;

    const [posts, totalPostsCount] = await Promise.all([Post.find().sort({ createdAt: -1 })
        .skip(skip)
        .limit(resultPerPage)
        .populate("user", "fullname username")
        .lean(),
    Post.countDocuments()]);

    const totalPages = Math.ceil(totalPostsCount / resultPerPage) || 0;

    if (!posts) throw new ApiError(400, "No Posts found.")

    return res.status(200).json({
        success: true,
        posts,
        totalPages,
    });
})

export { createPost, getAllPostOfAUser,allPosts}

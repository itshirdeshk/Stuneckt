import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiErrors.js"
import { Follower } from "../models/follower.model.js";

// Controller to follow a user
const followAUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const followerId = req.user;

    if (!userId) throw new ApiError(400, "User Id required.")

    const result = await Follower.create({
        user: userId, follower: followerId
    })

    return res.status(200).json({
        success: true,
        result,
        message: "User followed Successfully."
    })
})

// Controller to find all the followers of a user
const followersOfAUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const { page = 1 } = req.query;
    const resultPerPage = 20;

    const skip = (page - 1) * resultPerPage;

    const [followers, totalFollowersCount] = await Promise.all([Follower.find({ user: userId }).sort({ createdAt: -1 })
        // Applying pagination
        .skip(skip)
        .limit(resultPerPage)
        .populate("user follower", "fullname username")
        .lean(),
    Follower.countDocuments()]);

    const totalPages = Math.ceil(totalFollowersCount / resultPerPage) || 0;

    if (!followers) throw new ApiError(400, "No followers found.")

    return res.status(200).json({
        success: true,
        followers,
        totalPages,
    });
})

export { followAUser, followersOfAUser }
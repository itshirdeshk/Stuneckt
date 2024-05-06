import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { sendToken } from "../utils/Features.js";
import { compare } from "bcrypt";
import { cookieOptions } from "../utils/Features.js";
import { ApiError } from "../utils/ApiErrors.js";

// Create a new user -> save it to the database -> save token in cookie.
const newUser = asyncHandler(async (req, res) => {
    const { fullname, username, email, password, bio } = req.body;

    // Checking if any of the fields are empty or not.
    if (
        [username, fullname, email, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All Fields are required...");
    }

    // Checking if user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existedUser) {
        throw new ApiError(400, "User with email and username already exists!");
    }

    const user = await User.create({
        fullname,
        username,
        password,
        email,
        bio,
    });

    if (!user) {
        throw new ApiError(
            500,
            "Something went wrong while registering the user"
        );
    }

    // Saving token in the cookies
    sendToken(res, user, 201, "User Created...");
});

// Login the user -> save token in cookie
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user)
        throw new ApiError(400, "Invalid Email Or Password!");

    const isMatch = await compare(password, user.password);

    if (!isMatch)
        throw new ApiError(400, "Invalid Username Or Password!");

    // Saving token in the cookies
    sendToken(res, user, 200, `Welcome Back, ${user.fullname}`);
});

// Get user's basic details
const getUserDetails = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user);

    res.status(200).json({
        success: true,
        user,
    });
});

// Update user's details
// We will only update the full name and bio  
const updateUserDetails = asyncHandler(async (req, res) => {
    const { fullname, bio } = req.body;

    if (fullname === "" || bio === "") throw new ApiError(400, "All fields are required.")

    const user = await User.findByIdAndUpdate(req.user, {
        fullname, bio
    }, { new: true })

    res.status(200).json({
        success: true,
        user,
        message: "Details Updated Successfully"
    })
})

// Logout User
const logout = asyncHandler(async (req, res) => {
    // Removing the token from the cookies
    res.status(200)
        .cookie("stuneckt-token", "", { ...cookieOptions, maxAge: 0 })
        .json({
            success: true,
            message: "Logged Out Successfully!",
        });
})

export { newUser, login, logout, getUserDetails, updateUserDetails }
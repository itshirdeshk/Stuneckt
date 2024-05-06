import jwt from "jsonwebtoken";

const cookieOptions = {
    maxAge: 15 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
};

const sendToken = (res, user, code, message) => {
    // Creating a token by using json web token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(code).cookie("stuneckt-token", token, cookieOptions).json({
        success: true,
        user,
        message,
    });
};

export { sendToken, cookieOptions }
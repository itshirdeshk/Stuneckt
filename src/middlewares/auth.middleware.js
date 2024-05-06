import jwt from "jsonwebtoken"

const isAuthenticated = (req, res, next) => {
    const token = req.cookies["stuneckt-token"];

    if (!token)
        return res.status(400).json({
            success: false,
            message: "Please login first to access this route"
        })

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedData._id;

    next();
};

export { isAuthenticated }
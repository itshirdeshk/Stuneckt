import mongoose from "mongoose"; 
import bcrypt from "bcrypt";

// User Model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    bio: {
        type: String,
    },
}, { timestamps: true });

// Use a save pre hook so that our password doesn't hash everytime we save User.
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export const User = mongoose.model('User', userSchema);

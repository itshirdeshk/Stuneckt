import mongoose from "mongoose";

// Database setup
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}`
        );
        console.log(
            `\nMONGODB Connected !! | DB HOST: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log("MONGODB Error: ", error);
        process.exit(1);
    }
};

export default connectDB;
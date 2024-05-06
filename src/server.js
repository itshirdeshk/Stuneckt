import connectDB from "./db/index.js";
import { app } from "./app.js";

// Connecting to Database
connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log(`An Error Occured: ${error}`);
        });

        app.listen(process.env.PORT || 3000, () => {
            console.log(`💻 Server is running at PORT: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("MONGODB Connection Failed !!!", error);
    });
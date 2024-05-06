import { faker } from "@faker-js/faker";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";

// Mock data feeder script which feeds posts to the DB
const createPosts = async (numPosts) => {
    try {
        // Finding all the users
        const users = await User.find().select("_id");

        const postsPromise = [];

        for (let i = 0; i < numPosts; i++) {
            // Selecting a random user 
            const randomUser = users[Math.floor(Math.random() * users.length)];

            postsPromise.push(
                // Creating a post
                Post.create({
                    user: randomUser,
                    title: faker.lorem.text(),
                    content: faker.lorem.sentence(),
                })
            );
        }

        await Promise.all(postsPromise);

        console.log("Posts created successfully");
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export { createPosts }
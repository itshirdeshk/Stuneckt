import { faker } from "@faker-js/faker";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";

const createPosts = async (numPosts) => {
    try {
        const users = await User.find().select("_id");

        const postsPromise = [];

        for (let i = 0; i < numPosts; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];

            postsPromise.push(
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
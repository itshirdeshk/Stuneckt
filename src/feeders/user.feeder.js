import { faker } from "@faker-js/faker";
import { User } from "../models/user.model.js";

// Mock data feeder script which feeds users to the DB
const createUsers = async (numUsers) => {
    try {
        const usersPromise = [];

        for (let i = 0; i < numUsers; i++) {
            // Creating a user
            const tempUser = User.create({
                fullname: faker.person.fullName(),
                username: faker.internet.userName(),
                email: faker.internet.email(),
                bio: faker.lorem.sentence(10),
                password: "1234",
            });

            usersPromise.push(tempUser);
        }

        await Promise.all(usersPromise);
        console.log("Users Created Successfully");
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export { createUsers };
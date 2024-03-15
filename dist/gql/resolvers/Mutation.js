import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const Mutation = {
    signUp: async (parent, args, { prisma }) => {
        const isExist = await prisma.user.findUnique({
            where: {
                email: args.email,
            },
        });
        if (isExist) {
            return {
                errorMessage: "User already exist",
                token: null,
            };
        }
        const hashedPassword = await bcrypt.hash(args.password, 10);
        const newUser = await prisma.user.create({
            data: {
                name: args.name,
                email: args.email,
                password: hashedPassword,
            },
        });
        if (args.bio) {
            await prisma.profile.create({
                data: {
                    bio: args.bio,
                    userId: newUser.id,
                },
            });
        }
        const token = jwt.sign({ userId: newUser.id }, "secret");
        return {
            errorMessage: null,
            token,
        };
    },
    signIn: async (parent, args, { prisma }) => {
        const user = await prisma.user.findUnique({
            where: {
                email: args.email,
            },
        });
        if (!user) {
            return {
                errorMessage: "User not Found",
                token: null,
            };
        }
        const valid = await bcrypt.compare(args.password, user.password);
        if (!valid) {
            return {
                errorMessage: "Incorrect Password",
                token: null,
            };
        }
        const token = jwt.sign({ userId: user.id }, "secret");
        return {
            errorMessage: null,
            token,
        };
    },
    createPost: async (parent, args, { prisma, userId }) => {
        if (!userId) {
            return {
                errorMessage: "You are not authenticated",
                post: null,
            };
        }
        if (!args.title || !args.content) {
            return {
                errorMessage: "Title and Content are required",
                post: null,
            };
        }
        const newPost = await prisma.post.create({
            data: {
                title: args.title,
                content: args.content,
                authorId: userId,
            },
        });
        return {
            errorMessage: null,
            post: newPost,
        };
    },
};

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./gql/typeDefs.js";
import { resolvers } from "./gql/resolvers/index.js";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
export const prisma = new PrismaClient();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
        const userData = await jwt.verify(req.headers.authorization, "secret");
        return {
            prisma,
            userId: userData.userId,
        };
    },
});
console.log(`🚀  Server ready at: ${url}`);

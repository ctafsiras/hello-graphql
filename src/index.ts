import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./gql/typeDefs.js";
import { resolvers } from "./gql/resolvers/index.js";

import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library.js";
import jwt from "jsonwebtoken";

export const prisma = new PrismaClient();
interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  userId: string;
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }): Promise<Context> => {
    const userData = await jwt.verify(req.headers.authorization, "secret");
    return {
      prisma,
      userId: userData.userId,
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);

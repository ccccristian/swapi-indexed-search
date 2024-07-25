import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { typeDefs } from "./type-defs.js";
import { resolvers } from "./resolvers.js";
import { startServerAndCreateNextHandler } from "@as-integrations/next";


const server = new ApolloServer({typeDefs, resolvers})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async req => ({ req }),
});

export { handler as GET, handler as POST };
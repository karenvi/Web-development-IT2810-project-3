import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "dotenv/config";
import mongoose from "mongoose";
import { resolvers } from "./resolvers.js"; // Note: .js is intentional: if not included, the compiled version in dist/server.js
import { typedefs } from "./typedefs.js"; // will throw a "module not found" error
const uri = process.env.DB_URL;
async function connectToDB() {
    try {
        await mongoose.connect(uri);
        console.log("🎉 Connected to database successfully");
    }
    catch (err) {
        console.log(uri);
        console.log(err);
    }
}
connectToDB();
// The ApolloServer constructor requires two parameters: the schema definition and the set of resolvers
const server = new ApolloServer({
    typeDefs: typedefs,
    resolvers: resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀 Server ready at: ${url}`);

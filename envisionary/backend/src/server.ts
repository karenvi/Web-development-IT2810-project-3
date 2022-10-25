import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "dotenv/config"
import mongoose from "mongoose";
import { resolvers } from "./resolvers.js"; // TODO: .js should be removed
import { typedefs } from "./typedefs.js"; // TODO: .js should be removed - only there to work around module not found error in dist/server.js


const uri = process.env.DB_URL

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

// The ApolloServer constructor requires two parameters: your schema definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: typedefs,
  resolvers: resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);

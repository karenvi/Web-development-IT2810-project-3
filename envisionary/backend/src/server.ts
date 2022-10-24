import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import 'dotenv/config'
import mongoose from 'mongoose';
import {resolvers} from "./resolvers.js";
import {typedefs} from './typedefs.js';


const uri = process.env.DB_URL

async function connect() {
  try {
    //console.log(uri);
    await mongoose.connect(uri);
    mongoose.connection.db.listCollections().toArray(function (err, names) {
      console.log(names) // så vi kan se collections i databasen
    });
    console.log("🎉 Connected to database successfully");
  } catch (err) {
    console.log(uri);
    console.log(err);
  }
}
connect();


// The ApolloServer constructor requires two parameters: your schema definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: typedefs,
  resolvers: resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

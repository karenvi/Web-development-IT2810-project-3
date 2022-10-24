import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import 'dotenv/config'
import mongoose from 'mongoose';
import {resolvers} from "./resolvers";
import typedefs from './typedefs';


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

// The code below is from https://www.apollographql.com/docs/apollo-server/getting-started/
// A schema is a collection of type definitions (hence "typeDefs") that together define the "shape" 
// of queries that are executed against your data.
// const typedefs = `#graphql
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   type Country {
//     Rank: String
//     CCA3: String
//     Country: String
//     Capital: String
//     Continent: String
//     Population2022: String
//     Population2020: String
//     Population2015: String
//     Population2010: String
//     Population2000: String
//     Population1990: String
//     Population1980: String
//     Population1970: String
//     Area: String
//     Density: String
//     GrowthRate: String
//     WorldPopulationPercentage: String
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     countries: [Country]
//   }
// `;

// const resolvers = {
//     Query: {
//       countries: () => mongoose.connection.db.collection("countries").find({}).toArray(),
//     },
//   };


// The ApolloServer constructor requires two parameters: your schema definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: typedefs,
  resolvers: {resolvers},
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

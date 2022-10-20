import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import expressGraphQL from 'express';
import schema from './schema/schema';
const uri = process.env.DB_URL;
const app = express();
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));
async function connect() {
    try {
        //console.log(uri);
        await mongoose.connect(uri);
        mongoose.connection.db.listCollections().toArray(function (err, names) {
            console.log(names); // så vi kan se collections i databasen
        });
        console.log("🎉 Connected to database successfully");
    }
    catch (err) {
        console.log(uri);
        console.log(err);
    }
}
connect();
// The code below is from https://www.apollographql.com/docs/apollo-server/getting-started/
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;
const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
    },
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);

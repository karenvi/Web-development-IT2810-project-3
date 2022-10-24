import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import 'dotenv/config'
import mongoose, { Schema } from 'mongoose';

const uri = process.env.DB_URL

async function connect() {
    try {
        //console.log(uri);
        await mongoose.connect(uri);
        mongoose.connection.db.listCollections().toArray(function(err, names){
            console.log(names) // så vi kan se collections i databasen
        });
        console.log("🎉 Connected to database successfully");
    } catch (err) {
        console.log(uri);
        console.log(err);
    }
}
connect()

// The code below is from https://www.apollographql.com/docs/apollo-server/getting-started/
// A schema is a collection of type definitions (hence "typeDefs") that together define the "shape" 
// of queries that are executed against your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Review {
    Name: String
    ReviewText: String
    Date: String
    Rating: Int
  }

  type Country {
    Rank: String
    CCA3: String
    Country: String
    Capital: String
    Continent: String
    Population2022: String
    Population2020: String
    Population2015: String
    Population2010: String
    Population2000: String
    Population1990: String
    Population1980: String
    Population1970: String
    Area: String
    Density: String
    GrowthRate: String
    WorldPopulationPercentage: String
    AverageRating: Int
    Reviews: [Review]
  }



  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    countries: [Country]
    countriesByName(country: String): [Country]
    countriesAndReviews: [Country]
  }

  type Mutation {
    addReview(country: String, name: String, reviewText: String, date: Date, rating: Int)
  }
`;
/*
const reviewSchema = new mongoose.Schema({
  Name: 'string',
  ReviewText: 'string',
  Date: 'string',
  Rating: 'int' 
});

const countrySchema = new mongoose.Schema({
  Rank: 'string',
  CCA3: 'string',
  Country: 'string',
  Capital: 'string',
  Continent: 'string',
  Population2022: 'string',
  Population2020: 'string',
  Population2015: 'string',
  Population2010: 'string',
  Population2000: 'string',
  Population1990: 'string',
  Population1980: 'string',
  Population1970: 'string',
  Area: 'string',
  Density: 'string',
  GrowthRate: 'string',
  WorldPopulationPercentage: 'string',
  AverageRating: 'int',
  Reviews: [reviewSchema]
});
*/
//const countryModel = mongoose.model('CountryModel', countrySchema);
//const reviewModel = mongoose.model('ReviewModel', reviewSchema);
/* 
const ReviewModel = new mongoose.Model('Review', {
  Name: String,
  ReviewText: String,
  Date: String,
  Rating: Number
});


*/

function makeReview(nameInput: String, reviewTextInput: String, dateInput: String, ratingInput: Number) {
  return {
      Name: nameInput,
      ReviewText: reviewTextInput,
      Date: dateInput,
      Rating: ratingInput
  };
}



interface iReview {
  Name: String;
  ReviewText: String;
  Date: String;
  Rating: Number;
}
interface iCountry {
  Rank: String;
  CCA3: String;
  Country: String;
  Capital: String;
  Continent: String;
  Population2022: String;
  Population2020: String;
  Population2015: String;
  Population2010: String;
  Population2000: String;
  Population1990: String;
  Population1980: String;
  Population1970: String;
  Area: String;
  Density: String;
  GrowthRate: String;
  WorldPopulationPercentage: String;
  AverageRating: Number;
  Reviews: iReview;
};
const reviewSchema = new Schema<iReview>({
  Name: {Type: String},
  ReviewText: {Type: String},
  Date: {Type: String},
  Rating: {Type: Number}
});
const countrySchema = new Schema<iCountry>({
  Rank: {Type: String},
  CCA3: {Type: String},
  Country: {Type: String},
  Capital: {Type: String},
  Continent: {Type: String},
  Population2022: {Type: String},
  Population2020: {Type: String},
  Population2015: {Type: String},
  Population2010: {Type: String},
  Population2000: {Type: String},
  Population1990: {Type: String},
  Population1980: {Type: String},
  Population1970: {Type: String},
  Area: {Type: String},
  Density: {Type: String},
  GrowthRate: {Type: String},
  WorldPopulationPercentage: {Type: String},
  AverageRating: {Type: Number},
  Reviews: {Type: Array<iReview>}
});
const countries = mongoose.model<iCountry>('countries', countrySchema);
const reviewModel = mongoose.model<iReview>('countries.Review', reviewSchema);









const resolvers = {
    Query: {
      countries: () => mongoose.connection.db.collection("countries").find({}).toArray(),
      //mongoose.connection.db.collection("countries").find({}).toArray(),
      countriesByName: (parent, args, context, info) => mongoose.connection.db.collection("countries").find({ Country: args.country}).toArray(),
      //mongoose.connection.db.collection("countries").find({ Country: args.country}).toArray(),
      //(parent, args, context, info) => mongoose.connection.db.collection("countries").find((country: { Country: String; }) => country.Country === args.Country).toArray(),
    },
    Mutation: {
      addReview: (parent, args, context, info) => mongoose.connection.db.collection("countries").findOneAndUpdate(
        { Country: args.country }, 
        { $push: { Reviews: {Name: args.name, ReviewText: args.name, Date: args.date, Rating: args.rating} }})
      /*
      {
        //mongoose.connection.db.collection("countries").updateOne({ Country: args.country }, {});
        let review = { Name: args.name, ReviewText: args.reviewText, Date: args.Date, Rating: args.rating };
        let review = makeReview(args.name, args.reviewText, args.date, args.rating);
        console.log(review);
        
          //{ $push: { Reviews: review }, },)
        //{ $push: { Reviews: review }}),
      }
      */
    }
  };


// The ApolloServer constructor requires two parameters: your schema definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
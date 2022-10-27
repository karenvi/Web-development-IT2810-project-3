import { TypedQueryDocumentNode } from 'graphql';
import mongoose, { FilterQuery, Query, UpdateQuery } from 'mongoose';


interface IaddReviewArgs {
    Country: string; // for specifying which country the review is for, e.g. "Norway"
    Name: string; // author of the review
    ReviewText: string;
    Date: string; // set to string to avoid typing problems; in practice we create a new Date(), then convert to iso string
    Rating: number; // float between 1-5
};


export const resolvers = {
    Query: {
        countries: () => mongoose.connection.db.collection("countries").find({}).toArray(), // to get all countries
    },

    Mutation: {
        addReview: async (_parent: any, args: IaddReviewArgs) => {
            const filter = { Country: args.Country };
            const update = { $push: { Reviews: { Name: args.Name, ReviewText: args.ReviewText, Date: args.Date, Rating: args.Rating } } };
            const options = { new: true, upsert: true };

            const response = await mongoose.connection.db.collection("countries").findOneAndUpdate(filter, update as unknown, options);

            console.log(response.value);

            return response.value;
        },
    },

};

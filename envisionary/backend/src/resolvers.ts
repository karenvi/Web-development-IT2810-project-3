import mongoose from 'mongoose';


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
        addReview: async (_parent: unknown, args: IaddReviewArgs) => {
            const filter = { Country: args.Country };
            const update = { $push: { Reviews: { Name: args.Name, ReviewText: args.ReviewText, Date: args.Date, Rating: args.Rating } } };
            const options = { upsert: true };
            const response = await mongoose.connection.db.collection("countries").updateOne(filter, update, options);

            console.log(response.modifiedCount, " documents updated successfully");

            return response;
        },
    },

};

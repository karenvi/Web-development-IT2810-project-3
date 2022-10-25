import mongoose from 'mongoose';


interface IaddReviewArgs {
    Country: string; // for specifying which country the review is for, e.g. "Norway"
    Name: string; // name of reviewer
    ReviewText: string;
    Date: string; // set to string to avoid typing problems; in practice we should create a new date, then convert to string
    Rating: number; // should be an int between 1-5
};


export const resolvers = {
    Query: {
        countries: () => mongoose.connection.db.collection("countries").find({}).toArray(),
    },

    Mutation: {
        addReview: (_parent: unknown, args: IaddReviewArgs) => {
            const update = mongoose.connection.db.collection("countries").updateOne(
                { Country: args.Country }, // find the country the review is for
                { $push: { Reviews: { Name: args.Name, ReviewText: args.ReviewText, Date: args.Date, Rating: args.Rating } } }, // push review to Reviews array
                { upsert: true } // if Reviews array does not exist, create it
            );
            return "Successfully added review"; // TODO: add error handling and proper response
        },
    },

};

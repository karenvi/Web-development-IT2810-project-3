import mongoose from 'mongoose';
;
export const resolvers = {
    Query: {
        countries: () => mongoose.connection.db.collection("countries").find({}).toArray(),
    },
    Mutation: {
        addReview: (_parent, args) => {
            const update = mongoose.connection.db.collection("countries").updateOne({ Country: args.Country }, // find the country the review is for
            { $push: { Reviews: { Name: args.Name, ReviewText: args.ReviewText, Date: args.Date, Rating: args.Rating } } }, // push review to Reviews array
            { upsert: true } // if Reviews array does not exist, create it
            );
            return "Successfully added review"; // TODO: add error handling and proper response
        },
    },
};

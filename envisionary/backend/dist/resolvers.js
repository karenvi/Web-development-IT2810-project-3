import mongoose from 'mongoose';
export const resolvers = {
    Query: {
        countries: () => mongoose.connection.db.collection("countries").find({}).toArray(),
    },
    Mutation: {
        addReview: async (_parent, args) => {
            const update = await mongoose.connection.db.collection("countries").updateOne({ Country: args.Country }, { $push: { Reviews: { Name: args.Name, ReviewText: args.ReviewText, Date: args.Date, Rating: args.Rating } } }, { upsert: true });
            return "Successfully added review";
        },
    },
};

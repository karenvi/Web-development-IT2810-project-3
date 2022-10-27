import mongoose from 'mongoose';
;
export const resolvers = {
    Query: {
        countries: () => mongoose.connection.db.collection("countries").find({}).toArray(), // to get all countries
    },
    Mutation: {
        addReview: async (_parent, args) => {
            const filter = { Country: args.Country };
            const update = { $push: { Reviews: { Name: args.Name, ReviewText: args.ReviewText, Date: args.Date, Rating: args.Rating } } };
            const options = { new: true, upsert: true };
            const response = await mongoose.connection.db.collection("countries").findOneAndUpdate(filter, update, options);
            console.log(response.value);
            return response.value;
        },
    },
};

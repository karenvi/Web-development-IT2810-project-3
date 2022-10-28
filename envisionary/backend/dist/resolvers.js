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
            const options = { upsert: true };
            // Ideally we would use findOneAndUpdate as it can return the updated document after performing the update operation
            // However, the type of the update parameter in findOneAndUpdate was not assignable to the update operation we needed 
            // We therefore decided to use updateOne for the update operation and findOne to fetch the updated document for a response
            // While making two calls to the database is not ideal, it is still preferred if it allows us to maintain proper type checking + correct response
            await mongoose.connection.db.collection("countries").updateOne(filter, update, options);
            const response = await mongoose.connection.db.collection("countries").findOne(filter);
            return response;
        },
    },
};

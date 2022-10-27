import mongoose from 'mongoose';
;
export const resolvers = {
    Query: {
        countries: () => mongoose.connection.db.collection("countries").find({}).toArray(),
        countryByName: async (_parent, args) => {
            const response = await mongoose.connection.db.collection("countries").findOne({ Country: args.Country });
            console.log(response);
            return response;
        },
    },
    Mutation: {
        addReview: async (_parent, args) => {
            const filter = { Country: args.Country };
            const update = { $push: { Reviews: { Name: args.Name, ReviewText: args.ReviewText, Date: args.Date, Rating: args.Rating } } };
            const options = { upsert: true };
            const response = await mongoose.connection.db.collection("countries").updateOne(filter, update, options);
            console.log(response.modifiedCount, " documents updated successfully");
            return response;
        },
    },
};

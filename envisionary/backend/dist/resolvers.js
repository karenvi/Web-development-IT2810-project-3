import mongoose from 'mongoose';
export const resolvers = {
    Query: {
        countries: () => mongoose.connection.db.collection("countries").find({}).toArray(),
    },
};

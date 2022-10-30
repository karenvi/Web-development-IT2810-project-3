import mongoose, { FilterQuery, Query, UpdateQuery } from 'mongoose';

interface IaddReviewArgs {
    Country: string; // for specifying which country the review is for, e.g. "Norway"
    Name: string; // author of the review
    ReviewText: string;
    Date: string; // set to string to avoid typing problems; in practice we create a new Date(), then convert to iso string
    Rating: number; // float between 1-5
};

interface IcountryReviewsByNameArgs {
    Country: string
}

interface IPaginationArgs {
    offset: number;
    limit: number;
    sortOn: string;
    sortDesc: boolean; // descending = false when alphabetical order (A-Z, true for Z-A)
    filterField: string;
    query: string;
}

export const resolvers = {
    Query: {
        countries: () => mongoose.connection.db.collection("countries").find({}).toArray(), // to get all countries w/o pagination arguments

        paginatedCountries: async (_parent: unknown, args: IPaginationArgs) => { // resolver to get countries with pagination
            const sortOnField = args.sortOn;
            const sortingChoice = args.sortDesc ? -1 : 1; 
            const filterField = args.filterField;
            const queryRegex = args.query; // TODO: add search regex. Test in compass with e.g. { Country: { $regex: /y$/ } }

            const response = await mongoose.connection.db.collection("countries")
                .find({}) // .find({ [filterField]: {$regex: queryRegex} })
                .sort({ [sortOnField]: sortingChoice })
                .skip(args.offset * args.limit)
                .limit(args.limit).toArray();

            return response;
        },

        countryByName: async (_parent: unknown, args: IcountryReviewsByNameArgs) => {
            const response = await mongoose.connection.db.collection("countries").findOne({ Country: args.Country });
            return response;
        },
    },

    Mutation: {
        addReview: async (_parent: unknown, args: IaddReviewArgs) => {
            const filter = { Country: args.Country };
            const update = { $push: { Reviews: { Name: args.Name, ReviewText: args.ReviewText, Date: args.Date, Rating: args.Rating } } };
            const options = { upsert: true };

            // Ideally we would use findOneAndUpdate as it can return the updated document after performing the update operation
            // However, the type of the update parameter in findOneAndUpdate was not assignable to the update operation we needed 
            // We therefore decided to use updateOne to perform the update operation and findOne to fetch the updated document for a response
            // While making two calls to the database is not ideal, it is still preferred if it allows us to maintain proper type checking + correct response

            await mongoose.connection.db.collection("countries").updateOne(filter, update, options);
            const response = await mongoose.connection.db.collection("countries").findOne(filter);

            return response;
        },
    },

};

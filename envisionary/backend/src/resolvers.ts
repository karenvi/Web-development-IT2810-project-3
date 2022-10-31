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
    offset: number; // "page number"
    limit: number; // number of countries per page
    sortOn: string; // the field to sort on (e.g. sort on the "Country" field)
    sortDesc: boolean; // sortDesc: false when alphabetical order (A-Z)
    filterOn: string; // which field to filter on (e.g. filterOn: "Country" with searchFieldValue: "Norway" gives 1 match)
    searchFieldValue: string; // the input value in the search field
    hideUnreviewed: boolean; // filter to find only reviewed countries
};

export const resolvers = {
    Query: {
        countries: () => mongoose.connection.db.collection("countries").find({}).toArray(), // to get all countries w/o pagination arguments

        paginatedCountries: async (_parent: unknown, args: IPaginationArgs) => { // resolver to get countries with pagination
            const sortOnField = args.sortOn;
            const sortingChoice = args.sortDesc ? -1 : 1;
            const filterOnField = args.filterOn;
            const inputRegex = { $regex: `.*${args.searchFieldValue}.*`, $options: 'i' };
            const filter = args.hideUnreviewed
                ? { $and: [{ [filterOnField]: inputRegex }, { "Reviews": { $exists: args.hideUnreviewed } }] } // if show only reviewed countries
                : { [filterOnField]: inputRegex }; // if show both reviewed and unrevieved countries

            const response = await mongoose.connection.db.collection("countries")
                .find(filter)
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


import Country from "../models/models";


const resolvers = {
    Query: {
        getCountryByName(parents, args, context, info) {
            return Country.find({"Country" : "Norway"})
                .then(country => {
                    return country.map(result => ({ ...result }))
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }
};
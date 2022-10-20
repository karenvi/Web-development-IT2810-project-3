import mongoose from 'mongoose';
const { Schema } = mongoose;
const CountrySchema = new Schema({
    Rank: {
        type: String,
        required: true
    },
    CCA3: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        required: true
    },
    Capital: {
        type: String,
        required: true
    },
    Continent: {
        type: String,
        required: true
    },
    Population2022: {
        type: String,
        required: true
    },
    Population2020: {
        type: String,
        required: true
    },
    Population2015: {
        type: String,
        required: true
    },
    Population2010: {
        type: String,
        required: true
    },
    Population2000: {
        type: String,
        required: true
    },
    Population1990: {
        type: String,
        required: true
    },
    Population1980: {
        type: String,
        required: true
    },
    Population1970: {
        type: String,
        required: true
    },
    Area: {
        type: String,
        required: true
    },
    Density: {
        type: String,
        required: true
    },
    GrowthRate: {
        type: String,
        required: true
    },
    WorldPopulationPercentage: {
        type: String,
        required: true
    }
});
const Country = mongoose.model("Country", CountrySchema);
export default Country;

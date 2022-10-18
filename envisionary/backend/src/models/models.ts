import mongoose, { Model, Mongoose } from 'mongoose';

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


interface ICountryDoc extends mongoose.Document{
    Rank: {
        type: string,
        required: boolean
    },
    CCA3: {
        type: string,
        required: boolean
    },
    Country: {
        type: string,
        required: boolean
    },
    Capital: {
        type: string,
        required: boolean
    },
    Continent: {
        type: string,
        required: boolean
    },
    Population2022: {
        type: string,
        required: boolean
    },
    Population2020: {
        type: string,
        required: boolean
    },
    Population2015: {
        type: string,
        required: boolean
    },
    Population2010: {
        type: string,
        required: boolean
    },
    Population2000: {
        type: string,
        required: boolean
    },
    Population1990: {
        type: string,
        required: boolean
    },
    Population1980: {
        type: string,
        required: boolean
    },
    Population1970: {
        type: string,
        required: boolean
    },
    Area: {
        type: string,
        required: boolean
    },
    Density: {
        type: string,
        required: boolean
    },
    GrowthRate: {
        type: string,
        required: boolean
    },
    WorldPopulationPercentage: {
        type: string,
        required: boolean
    }
}

const Country  = mongoose.model<ICountryDoc>("Country", CountrySchema);

export default Country;

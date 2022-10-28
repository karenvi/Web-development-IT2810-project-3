import { gql } from "@apollo/client";

// Code for displaying data from the database
export const GET_COUNTRIES = gql`
query Countries {
    countries {
    _id,
    Rank,
    CCA3,
    Country,
    Capital,
    Continent,
    Population2022,
    Population2020,
    Population2015,
    Population2010,
    Population2000,
    Population1990,
    Population1980,
    Population1970,
    Area,
    Density,
    GrowthRate,
    WorldPopulationPercentage,
    Reviews {
        Name,
        ReviewText,
        Date,
        Rating
    }
    }
}
`;
export const GET_REVIEWS_BY_COUNTRY_NAME = gql`
query CountryReviewsByName($country: String) {
  countryByName(Country: $country) {
    Reviews{
        Name,
        ReviewText,
        Date,
        Rating
    }
    }
}
`;

export interface IReview {
    Name: string
    ReviewText: string,
    Date: string,
    Rating: number
}

export interface ICountry {
    _id: {
        $oid: string
    },
    Rank: string,
    CCA3: string,
    Country: string,
    Capital: string,
    Continent: string,
    Population2022: string,
    Population2020: string,
    Population2015: string,
    Population2010: string,
    Population2000: string,
    Population1990: string,
    Population1980: string,
    Population1970: string,
    Area: string,
    Density: string,
    GrowthRate: string,
    WorldPopulationPercentage: string,
    Reviews: Array<IReview>
}
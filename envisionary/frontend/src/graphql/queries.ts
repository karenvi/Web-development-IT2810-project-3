import { gql } from "@apollo/client";

// Get all countries with all fields
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

// Get a reviews for a specific country
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

// Get only country names
export const GET_COUNTRY_NAMES = gql`
query getCountryNames {
    countries {
        Country
    }
}`;
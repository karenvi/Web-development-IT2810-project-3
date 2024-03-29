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

export const GET_COUNTRIES_PAGINATION = gql`
query PaginatedCountries($offset: Int, $limit: Int, $sortOn: String, $sortDesc: Boolean, $filterOn: String, $searchFieldValue: String, $hideUnreviewed: Boolean) {
  paginatedCountries(offset: $offset, limit: $limit, sortOn: $sortOn, sortDesc: $sortDesc, filterOn: $filterOn, searchFieldValue: $searchFieldValue, hideUnreviewed: $hideUnreviewed) {
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

// Get a reviews for a specific country
export const GET_COUNTRY_DATA_BY_NAME = gql`
query GetCountryDataByName($country: String) {
  countryByName(Country: $country) {
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
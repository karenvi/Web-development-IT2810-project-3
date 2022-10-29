export const typedefs = `#graphql

type Review {
  Name: String
  ReviewText: String
  Date: String
  Rating: Float
}

type Country {
  _id: ID
  Rank: String 
  CCA3: String
  Country: String
  Capital: String
  Continent: String
  Population2022: String
  Population2020: String
  Population2015: String
  Population2010: String
  Population2000: String
  Population1990: String
  Population1980: String
  Population1970: String
  Area: String
  Density: String
  GrowthRate: String
  WorldPopulationPercentage: String
  Reviews: [Review]
}

type Query {
  countries: [Country]
  paginatedCountries(offset: Int, limit: Int): [Country]
  countryByName(Country: String): Country
}

type Mutation {
   addReview(Country: String, Name: String, ReviewText: String, Date: String, Rating: Float) : Country
}
`;

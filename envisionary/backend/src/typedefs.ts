export default `#graphql

  type Country {
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
  }

  type Query {
    countries: [Country]
  }
`;

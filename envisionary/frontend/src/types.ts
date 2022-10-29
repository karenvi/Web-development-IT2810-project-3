// Contains interfaces and type definitions used by several components

export interface IReview {
    Name: string;
    ReviewText: string;
    Date: string;
    Rating: number;
}

export interface ICountry {
    _id: string;
    Rank: string;
    CCA3: string;
    Country: string;
    Capital: string;
    Continent: string;
    Population2022: string;
    Population2020: string;
    Population2015: string;
    Population2010: string;
    Population2000: string;
    Population1990: string;
    Population1980: string;
    Population1970: string;
    Area: string;
    Density: string;
    GrowthRate: string;
    WorldPopulationPercentage: string;
    Reviews: Array<IReview>;
}

export interface IPagination {
    _id: string;
    Country: string;
    Continent: string;
    Population2022: string;
    Area: string;
}
import * as React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_COUNTRIES } from '../graphql/queries';
export {};


const data: Array<any> = [{ id: "1", Rank: "36", Country: "Afghanistan", Capital: "Kabul", Continent: "Asia",  
                            Population2022: "41128771", Population2020: "38972230", Population2015: "33753499",
                            Population2010: "28189672", Population2000: "19542982", Population1990: "10694796", 
                            Population1980: "12486631", Population1970: "10752971", Area: "652230", Density: "63.0587", 
                            GrowthRate: "1.0257", WorldPopulationPercentage: "0.52" },
                            
                            { id: "1", Rank: "36", Country: "Afghanistan", Capital: "Kabul", Continent: "Asia",  
                            Population2022: "41128771", Population2020: "38972230", Population2015: "33753499",
                            Population2010: "28189672", Population2000: "19542982", Population1990: "10694796", 
                            Population1980: "12486631", Population1970: "10752971", Area: "652230", Density: "63.0587", 
                            GrowthRate: "1.0257", WorldPopulationPercentage: "0.52" },
                            
                            { id: "1", Rank: "36", Country: "Afghanistan", Capital: "Kabul", Continent: "Asia",  
                            Population2022: "41128771", Population2020: "38972230", Population2015: "33753499",
                            Population2010: "28189672", Population2000: "19542982", Population1990: "10694796", 
                            Population1980: "12486631", Population1970: "10752971", Area: "652230", Density: "63.0587", 
                            GrowthRate: "1.0257", WorldPopulationPercentage: "0.52" },
                            
                            { id: "1", Rank: "36", Country: "Afghanistan", Capital: "Kabul", Continent: "Asia",  
                            Population2022: "41128771", Population2020: "38972230", Population2015: "33753499",
                            Population2010: "28189672", Population2000: "19542982", Population1990: "10694796", 
                            Population1980: "12486631", Population1970: "10752971", Area: "652230", Density: "63.0587", 
                            GrowthRate: "1.0257", WorldPopulationPercentage: "0.52" },
                        
                            { id: "1", Rank: "36", Country: "Afghanistan", Capital: "Kabul", Continent: "Asia",  
                            Population2022: "41128771", Population2020: "38972230", Population2015: "33753499",
                            Population2010: "28189672", Population2000: "19542982", Population1990: "10694796", 
                            Population1980: "12486631", Population1970: "10752971", Area: "652230", Density: "63.0587", 
                            GrowthRate: "1.0257", WorldPopulationPercentage: "0.52" },
                        
                            { id: "1", Rank: "36", Country: "Afghanistan", Capital: "Kabul", Continent: "Asia",  
                            Population2022: "41128771", Population2020: "38972230", Population2015: "33753499",
                            Population2010: "28189672", Population2000: "19542982", Population1990: "10694796", 
                            Population1980: "12486631", Population1970: "10752971", Area: "652230", Density: "63.0587", 
                            GrowthRate: "1.0257", WorldPopulationPercentage: "0.52" },

                            { id: "1", Rank: "36", Country: "Afghanistan", Capital: "Kabul", Continent: "Asia",  
                            Population2022: "41128771", Population2020: "38972230", Population2015: "33753499",
                            Population2010: "28189672", Population2000: "19542982", Population1990: "10694796", 
                            Population1980: "12486631", Population1970: "10752971", Area: "652230", Density: "63.0587", 
                            GrowthRate: "1.0257", WorldPopulationPercentage: "0.52" },

                            { id: "1", Rank: "36", Country: "Afghanistan", Capital: "Kabul", Continent: "Asia",  
                            Population2022: "41128771", Population2020: "38972230", Population2015: "33753499",
                            Population2010: "28189672", Population2000: "19542982", Population1990: "10694796", 
                            Population1980: "12486631", Population1970: "10752971", Area: "652230", Density: "63.0587", 
                            GrowthRate: "1.0257", WorldPopulationPercentage: "0.52" },

                            { id: "1", Rank: "36", Country: "Afghanistan", Capital: "Kabul", Continent: "Asia",  
                            Population2022: "41128771", Population2020: "38972230", Population2015: "33753499",
                            Population2010: "28189672", Population2000: "19542982", Population1990: "10694796", 
                            Population1980: "12486631", Population1970: "10752971", Area: "652230", Density: "63.0587", 
                            GrowthRate: "1.0257", WorldPopulationPercentage: "0.52" },

                            { id: "1", Rank: "36", Country: "Afghanistan", Capital: "Kabul", Continent: "Asia",  
                            Population2022: "41128771", Population2020: "38972230", Population2015: "33753499",
                            Population2010: "28189672", Population2000: "19542982", Population1990: "10694796", 
                            Population1980: "12486631", Population1970: "10752971", Area: "652230", Density: "63.0587", 
                            GrowthRate: "1.0257", WorldPopulationPercentage: "0.52" },

                            { id: "1", Rank: "36", Country: "Afghanistan", Capital: "Kabul", Continent: "Asia",  
                            Population2022: "41128771", Population2020: "38972230", Population2015: "33753499",
                            Population2010: "28189672", Population2000: "19542982", Population1990: "10694796", 
                            Population1980: "12486631", Population1970: "10752971", Area: "652230", Density: "63.0587", 
                            GrowthRate: "1.0257", WorldPopulationPercentage: "0.52" }
                        
                        ];

describe("testing PaginationFunctions component", () => {

});






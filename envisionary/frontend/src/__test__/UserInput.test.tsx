import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import renderer from 'react-test-renderer';
import UserInput from "../components/UserInput";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilObserver } from "./testStates/testStates";
import { searchQueryState } from "../states/states";
import { mocks } from './mocks/mocks';
import { MockedProvider } from "@apollo/client/testing";
export {};


const data: Array<any> = [
    { _id: "1", Area: "120538", CCA3: "PRK", Capital: "Pyongyang", Continent: "Asia", Country: "North Korea", Density: "216.2755", 
    GrowthRate: "1.0038", Population1970: "14996879", Population1980: "17973650", Population1990: "20799523", Population2000: "23367059",
    Population2010: "24686435", Population2015: "25258015", Population2020: "25867467", Population2022: "26069416", Rank: "56",
    WorldPopulationPercentage: "0.33" },
                            
    { _id: "2", Area: "25713", CCA3: "MKD", Capital: "Skopje", Continent: "Europe", Country: "North Macedonia", Density: "81.4218", GrowthRate: "0.9954",
    Population1970: "1656783", Population1980: "1907023", Population1990: "2044174", Population2000: "2037936", Population2010: "2093828",
    Population2015: "2107962", Population2020: "2111072", Population2022: "2093599", Rank: "150", WorldPopulationPercentage: "0.03"},
    
    { _id: "3", Area: "464", CCA3: "NFK", Capital: "Saipan", Continent: "Oceania", Country: "Northern Mariana Islands", Density: "106.7909", 
    GrowthRate: "1.0014", Population1970: "10143", Population1980: "17613", Population1990: "48002", Population2000: "80338", Population2010: "54087",
    Population2015: "51514", Population2020: "49587", Population2022: "49551", Rank: "210", WorldPopulationPercentage: "0"},
];


describe("Testing UserInput component", () => {
    
    it("snapshot test", () => {

        const component = renderer.create(
            <Router>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <RecoilRoot>
                        <UserInput queryFilteredCountries={data} />
                    </RecoilRoot>
                </MockedProvider>
            </Router>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

     it("result is changed when typing", () => {

        const onInput = jest.fn(); 

        render(
            <Router>
                <RecoilRoot>
                    <RecoilObserver node={searchQueryState} onInput={onInput} />
                    <UserInput queryFilteredCountries={data} />
                </RecoilRoot>,
            </Router>
          );

        const component = screen.getByTestId("header-search"); 
        fireEvent.change(component, {target: {value: 'North Korea'}});
        expect(onInput).toHaveBeenCalled();

        const countryList = screen.getByText("North Korea");
        expect(countryList).toContainHTML("North Korea");
    });
});
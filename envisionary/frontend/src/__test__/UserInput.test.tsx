import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import renderer from 'react-test-renderer';
import UserInput from "../components/UserInput";
import { RecoilRoot } from "recoil";
import { HashRouter as Router } from "react-router-dom";
import { RecoilObserver } from "./testStates/testStates";
import { searchQueryState } from "../states/states";
import { mocks } from './mocks/mocks';
import { MockedProvider } from "@apollo/client/testing";
export {};


describe("Testing UserInput component", () => {
    
    it("snapshot test", () => {

        const component = renderer.create(
            <Router>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <RecoilRoot>
                        <UserInput />
                    </RecoilRoot>
                </MockedProvider>
            </Router>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

/*      it("result is changed when typing", () => {

        const onInput = jest.fn(); 

        render(
            <Router>
                <MockedProvider mocks={mocks} addTypename={false}></MockedProvider>
                <RecoilRoot>
                    <RecoilObserver node={searchQueryState} onInput={onInput} />
                    <UserInput />
                </RecoilRoot>,
            </Router>
          );

        const component = screen.getByTestId("header-search"); 
        fireEvent.change(component, {target: {value: 'North Korea'}});
        expect(onInput).toHaveBeenCalled();

        const countryList = screen.getByText("North Korea");
        expect(countryList).toContainHTML("North Korea");
    }); */

    it("contains the proper elements", () => {
        const component = renderer.create(
            <Router>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <RecoilRoot>
                        <UserInput />
                    </RecoilRoot>
                </MockedProvider>
            </Router>
        );
        
        const spans = component.root.findAllByType('span');
        expect(spans[0].props.children[0]).toBe('Search by ');
        expect(spans[0].props.children[1]).toBe('country');
        expect(spans[2].props.children).toBe('Select what to search category to search in');




    })
});
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

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();



    });

    it("result is changed when typing", () => {

        const onInput = jest.fn(); 

        render(
            <Router>
                <MockedProvider mocks={mocks} addTypename={false}>
                <RecoilRoot>
                    <RecoilObserver node={searchQueryState} onInput={onInput} />
                    <UserInput />
                </RecoilRoot>
                </MockedProvider>
            </Router>
          );

        // typing into search field actually does something
        const component = screen.getByTestId("search-test"); 
        fireEvent.change(component, {target: {value: 'North Korea'}});
        expect(onInput).toHaveBeenCalled();
    });

    it("drop down menu contains correct information", () => {

        const onInput = jest.fn(); 

        render(
            <Router>
                <MockedProvider mocks={mocks} addTypename={false}>
                <RecoilRoot>
                    <RecoilObserver node={searchQueryState} onInput={onInput} />
                    <UserInput />
                </RecoilRoot>
                </MockedProvider>
            </Router>
          );

        const component = screen.getByTestId("select-test") as HTMLInputElement;
        expect(component.value).toBe("Country");
    });

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
        expect(spans[0].props.children).toBe('Search for country');
        expect(spans[1].props.children).toBe('Select which category to search in');
        expect(spans[2].props.children).toBe('Category:');




    })
});
import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import renderer from 'react-test-renderer';
import { HashRouter as Router } from "react-router-dom";
import { create, ReactTestRenderer } from 'react-test-renderer';
import { RecoilRoot } from 'recoil';
import Countries from '../components/Countries';
import { mocks } from './mocks/mocks';
import Reviews from '../components/Reviews';
import { GET_REVIEWS_BY_COUNTRY_NAME } from "../graphql/queries"
export {};


describe("Testing Countries component", () => {
    
    it("snapshot test", () => {

        const component = renderer.create(
            <Router>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <RecoilRoot>
                        <Reviews />
                    </RecoilRoot>
                </MockedProvider>
            </Router>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});
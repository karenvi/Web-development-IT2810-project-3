import { render } from '@testing-library/react';
import App from './App';
import { RecoilRoot } from 'recoil';
import { MockedProvider } from "@apollo/client/testing";
import { mocks } from './__test__/mocks/mocks';



it("App renders correctly", () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RecoilRoot>
          <App/>
        </RecoilRoot>
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });


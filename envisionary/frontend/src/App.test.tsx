import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { RecoilRoot } from 'recoil';


it("renders page correctly", () => {
    const { container } = render(<App/>);
    expect(container).toMatchSnapshot();
  });


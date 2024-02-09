import React from 'react';
import { render } from '@testing-library/react';
import signup from '../src/components/signup';

describe('signup Component', () => {
  test('matches snapshot', () => {
    const { asFragment } = render(<signup />);
    expect(asFragment()).toMatchSnapshot();
  });
});

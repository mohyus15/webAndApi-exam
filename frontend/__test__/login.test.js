import React from 'react';
import { render } from '@testing-library/react';
import login from '../src/components/login';

describe('Login Component', () => {
  test('matches snapshot', () => {
    const { asFragment } = render(<login />);
    expect(asFragment()).toMatchSnapshot();
  });
});

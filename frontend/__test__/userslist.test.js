import React from 'react';
import { render } from '@testing-library/react';
import userslist from '../src/admin/userslist';

describe('Login Component', () => {
  test('matches snapshot', () => {
    const { asFragment } = render(<userslist/>);
    expect(asFragment()).toMatchSnapshot();
  });
});



import React from 'react';
import renderer from 'react-test-renderer';
import login from '../src/components/login';
it('renders correctly', () => {
	const snap = renderer.create(<login/>);
	expect(snap).toMatchSnapshot();
});



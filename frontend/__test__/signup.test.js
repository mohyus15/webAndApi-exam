import React from 'react';
import renderer from 'react-test-renderer';
import signup from '../src/components/signup';
it('renders correctly', () => {
	const snap = renderer.create(<signup/>);
	expect(snap).toMatchSnapshot();
});



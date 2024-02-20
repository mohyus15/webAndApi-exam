import React from 'react';
import renderer from 'react-test-renderer';
import profile from '../src/components/profile';
it('renders correctly', () => {
	const snap = renderer.create(<profile/>);
	expect(snap).toMatchSnapshot();
});

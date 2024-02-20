import React from 'react';
import renderer from 'react-test-renderer';
import userslist from '../src/admin/userslist';
it('renders correctly', () => {
	const snap = renderer.create(<userslist/>);
	expect(snap).toMatchSnapshot();
});


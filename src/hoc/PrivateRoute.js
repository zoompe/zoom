import React from 'react';
import { useHistory } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function PrivateRoute({ component: Component, ...rest }) {
	const history = useHistory();

	return (
		<Route
			{...rest}
			render={(props) => (Cookies.get('authToken') ? <Component {...props} /> : history.push('/'))}
		/>
	);
}



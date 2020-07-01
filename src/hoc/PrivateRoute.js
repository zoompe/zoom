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

// import React, { useContext } from 'react';
// import { useHistory } from 'react-router-dom';
// import { UserContext } from '../contexts/UserContext';

// export  default  function (ComposedComponent) {
//   const history = useHistory();
//   const { user } = useContext(UserContext)

//   const logged = user.token
//   if (logged !== true) return history.push('/')
//   // return  <ComposedComponent />
//   return history.push('/home/main')

// };

// import  React, { Component } from  'react';
// import { connect } from  'react-redux';
// import { browserHistory } from  'react-router';

// export  default  function (ComposedComponent) {
//     class  Authentication  extends  Component {
//         componentWillMount() {
//             if (!this.props.authenticated)
//                 this.props.history.push('/signin');
//         }
//         componentWillUpdate() {
//             if (!this.props.authenticated)
//                 this.props.history.push('/signin');
//         }
//         render() {
//             return  <ComposedComponent  {...this.props}  />
//         }
//     }

//     function  mapStateToProps(state) {
//         return { authenticated:  state.auth.token?true:false };
//     }

//     return  connect(mapStateToProps)(Authentication);
// }

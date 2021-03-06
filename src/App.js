import React, { useContext } from 'react';
import NavContextProvider from './contexts/NavContext';
import { Switch, Route } from 'react-router-dom';
import Login from './components/connexion/Login';
import RegisterUser from './components/connexion/RegisterUser';
import Main from './components/main/Main';
import Contacts from './components/activites/contacts/Contacts';
import Presta from './components/activites/prestations/Presta';
import Efo from './components/training/Efo';
import Diag from './components/wallet/diag/Diag';
import Jalons from './components/wallet/jalons/Jalons';
import Load from './components/load/Load';
import UpdateUser from './components/connexion/UpdateUser';
import PrivateRoute from './hoc/PrivateRoute';
import { UserContext } from './contexts/UserContext';

function App() {
	const { user } = useContext(UserContext);
	const { idgasi } = user;

	window.addEventListener('beforeunload', async (event) => {
		if (idgasi !== undefined) {
		var URL = `/users/disconnection/${idgasi}`;
		navigator.sendBeacon(URL);
		}
	  });


	return (
		<div className="App">
				<NavContextProvider>
					<Switch>
						<Route exact path="/" component={Login} />
						<Route
							exact
							path="/home/:route"
							render={() => (
								<Main>
									<PrivateRoute path="home/main" component={Main}/>
									{/* <Route path="home/main" component={Main} /> */}
									<PrivateRoute path="/home/diag" component={Diag} />
									<PrivateRoute path="/home/jalons" component={Jalons} />
									<PrivateRoute path="/home/efo" component={Efo} />
									<PrivateRoute path="/home/contacts" component={Contacts} />
									<PrivateRoute path="/home/presta" component={Presta} />
									<PrivateRoute path="/home/Load" component={Load} />
									<PrivateRoute path="/home/user" component={UpdateUser} />
								</Main>
							)}
						/>
						<Route path="/register" component={RegisterUser} />
					</Switch>
				</NavContextProvider>
		</div>
	);
}

export default App;

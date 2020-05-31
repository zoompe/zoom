import React from 'react';
import UserContextProvider from './contexts/UserContext';
import NavContextProvider from './contexts/NavContext'; 
import { Switch , Route } from 'react-router-dom' ;
import Home from './components/home/Home';
import Login from './components/connexion/Login';
import Jalons from './components/wallet/jalons/Jalons';
import Diag from './components/wallet/diag/Diag';
import Efo from './components/training/Efo';
import Contacts from './components/activites/contacts/Contacts';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
      <NavContextProvider>
          <Switch>
            <Route exact path="/" component = {Login} />
            <Route path="/home" component = {Home} />
            <Route path="/diag" component = {Diag} />
            <Route path="/jalons" component = {Jalons} />
            <Route path="/efo" component = {Efo} />
            <Route path="/contacts" component = {Contacts} />
          </Switch>
      </NavContextProvider>    
      </UserContextProvider>
    </div>
  );
}

export default App;




         
import React from 'react';
import UserContextProvider from './contexts/UserContext';
import Home from './components/home/Home';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Home />
      </UserContextProvider>
    </div>
  );
}

export default App;

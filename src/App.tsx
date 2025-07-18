import React from 'react';
import logo from './logo.svg';
import './Styles/global.css';
import SearchBar from './Components/SearchBar';
import Card from './Components/Card';
import './logo.png'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={require('./logo_white.png')}/>
        <SearchBar />
      </header>
      
    </div>
  );
}

export default App;

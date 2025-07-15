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
        {/* testing */}
        {/* <div className="grid">
          <Card url={""} data={{img:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Balantiocheilos_melanopterus_-_Karlsruhe_Zoo_02_%28cropped%29.jpg/1280px-Balantiocheilos_melanopterus_-_Karlsruhe_Zoo_02_%28cropped%29.jpg",title:"test title test title yaaaytttttttttttttttttttt",price:"20"}}/>
          <Card url={""} data={{img:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Balantiocheilos_melanopterus_-_Karlsruhe_Zoo_02_%28cropped%29.jpg/1280px-Balantiocheilos_melanopterus_-_Karlsruhe_Zoo_02_%28cropped%29.jpg",title:"test",price:"20"}}/>
          <Card url={""} data={{img:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Balantiocheilos_melanopterus_-_Karlsruhe_Zoo_02_%28cropped%29.jpg/1280px-Balantiocheilos_melanopterus_-_Karlsruhe_Zoo_02_%28cropped%29.jpg",title:"test",price:"20"}}/>
          <Card url={""} data={{img:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Balantiocheilos_melanopterus_-_Karlsruhe_Zoo_02_%28cropped%29.jpg/1280px-Balantiocheilos_melanopterus_-_Karlsruhe_Zoo_02_%28cropped%29.jpg",title:"test",price:"20"}}/>
          <Card url={""} data={{img:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Balantiocheilos_melanopterus_-_Karlsruhe_Zoo_02_%28cropped%29.jpg/1280px-Balantiocheilos_melanopterus_-_Karlsruhe_Zoo_02_%28cropped%29.jpg",title:"test",price:"20"}}/>
        </div> */}
        
      </header>
      
    </div>
  );
}

export default App;

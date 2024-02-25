import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import MyComponent from './comp/comp';

function App() {
  const [showComponent, setShowComponent] = useState(false); // State to track if MyComponent should be shown
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => setShowComponent(!showComponent)}> 
        {/* Button to toggle MyComponent visibility */}
          {showComponent ? 'Hide Component' : 'Show Component'}
        </button>
        1
        {showComponent && <MyComponent />} Show MyComponent if showComponent is true
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

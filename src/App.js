import './App.css';
import React, { useState } from 'react';
import MyComponent from './comp/comp';

function App() {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <button className="neon-button" onClick={() => setShowComponent(!showComponent)}>
          {showComponent ? 'Hide Component' : 'Show Component'}
        </button>
        {showComponent && <div className="neon-text"><MyComponent /></div>}
      </header>
    </div>
  );
}

export default App;

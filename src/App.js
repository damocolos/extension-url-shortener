import React from 'react';
import './App.css';
import Generator from './components/Generator';
import List from './components/List';

function App() {
  return (
    <div className='App'>
      {/* title */}
      <h3>URL Shortener</h3>
      {/* generator section */}
      <Generator />
      {/* list section */}
      <List />
    </div>
  );
}

export default App;

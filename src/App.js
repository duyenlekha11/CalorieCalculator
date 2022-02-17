import './App.css';
import React from 'react';
import Navbar  from './components/Navbar/Navbar';
import { Dropdown, Option } from "./components/Dropdown/Dropdown";

function App() {
  return (
    <div className="App">
      <Navbar />
      <h1>Which service are you interested in?</h1>
      <Dropdown>
        <Option selected value="Click to see options" />
        <Option value="Option 1" />
        <Option value="Option 2" />
        <Option value="Option 3" />
      </Dropdown>
    </div>
  );
}

export default App;

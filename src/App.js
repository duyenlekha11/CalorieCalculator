import './App.css';
import React from 'react';
import Navbar  from './components/Navbar/Navbar';
import { Dropdown, Option } from "./components/Dropdown/Dropdown";

function App() {
  return (
    <div className="App">
      <Navbar />
      <h1>How often do you excercise?</h1>
      <Dropdown>
        <Option selected value="Click to see options" />
        <Option value="No excercise" />
        <Option value="1-3 days a week" />
        <Option value="4-5 days a week" />
        <Option value="6-7 days a week" />
      </Dropdown>
    </div>
  );
}

export default App;

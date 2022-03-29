import './App.css';
import React from 'react';
import ContactUs  from './pages/ContactUs';
import FoodCalories from './pages/FoodCalories';
import HealthTips from './pages/HealthTips';
import Home from './pages/Home';
import Layout from './Layout'
import Navbar  from './components/Navbar/Navbar';
import { Router, Route, Link, BrowserRouter, Routes } from 'react-router-dom'
import axios from 'axios'

// export default axios.create({
//   baseURL: 'https://api.nal.usda.gov/fdc/v1/',
//   },
// });
function App() {

  axios.defaults.baseURL = 'https://api.nal.usda.gov/fdc/v1/'

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path = "/" element = {<Layout />} >
            <Route path = "/" element = {<Home />} />
            <Route path = "foodcalories" element = {<FoodCalories />} />
            <Route path = "healthtips" element = {<HealthTips />} />
            <Route path = "contactus" element = {<ContactUs />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <Navbar />
      
    // </div>
  
  );
}

export default App;

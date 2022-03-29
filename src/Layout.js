import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar/Navbar';
import {Outlet} from 'react-router';

function Layout() {
  return (
    <div className="Layout">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;

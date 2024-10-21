import React from 'react';
import SideMenu from './SideMenu'; // Import the SideMenu component
import './styles/Home.css';

function UsagePage() {
  return (
    <div className="home-page">
      <SideMenu activeLink='usage'/>
      <div className="content">
        <h1>Usage Page</h1>
        <p>View your usage</p>
      </div>
    </div>
  );
}

export default UsagePage;

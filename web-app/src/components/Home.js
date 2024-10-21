import React from 'react';
import SideMenu from './SideMenu'; // Import the SideMenu component
import './styles/Home.css';

function HomePage() {
  return (
    <div className="home-page">
      <SideMenu activeLink='home'/>
      <div className="content">
        <h1>Welcome to Your Dashboard</h1>
        <p>Home Page</p>
      </div>
    </div>
  );
}

export default HomePage;

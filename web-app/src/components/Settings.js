import React from 'react';
import SideMenu from './SideMenu'; // Import the SideMenu component
import './styles/Home.css';

function SettingsPage() {
  return (
    <div className="home-page">
      <SideMenu activeLink='settings'/>
      <div className="content">
        <h1>Settings</h1>
      </div>
    </div>
  );
}

export default SettingsPage;

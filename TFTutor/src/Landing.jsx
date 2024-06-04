import React from 'react';
import './Landing.css';

import whiteLogo from './assets/whiteLogo.png';

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="logo-container">
        <img src={whiteLogo} alt="White TFTutor Logo" className="logo" />
        <span className="title">TFTutor</span>
      </div>
      <div className="search-container">
        <select className="region-select">
          <option value="NA">NA</option>
          {/* Add more regions as options here */}
        </select>
        <input type="text" placeholder="Search a RiotID #Tagline" className="search-input" />
        <button className="search-button">Search</button>
        <button className="refresh-button">Refresh</button>
      </div>
    </div>
  );
};

export default Landing;

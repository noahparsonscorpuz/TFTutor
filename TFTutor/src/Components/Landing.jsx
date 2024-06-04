import React from 'react';
import './Landing.css';
import { useState } from 'react';

import whiteLogo from '../assets/whiteLogo.png';

export const Landing = () => {
    const [input, setInput] = useState("")
    
  return (
    <div className="landing-container">
      <div className="logo-container">
        <img src={whiteLogo} alt="White TFTutor Logo" className="logo" />
        <span className="title">TFTutor</span>
      </div>
      <div className="search-container">
        <select className="region-select">
          <option value="NA">NA</option>
          {/* Add more regions as options here when functioning... */}
        </select>
        <input type="text" placeholder="Search a RiotID #Tagline" value={input} onChange={(e) => setInput(e.target.value)} className="search-input" />
        <button className="search-button">Search</button>
        <button className="refresh-button">Refresh</button>
      </div>
    </div>
  );
};

export default Landing;

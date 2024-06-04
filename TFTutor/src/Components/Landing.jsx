import React, { useState } from 'react';
import './Landing.css';
import axios from 'axios';

import whiteLogo from '../assets/whiteLogo.png';

export const Landing = ({ handleSearchResult }) => {
  const [input, setInput] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("NA");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Split the input into gameName and tagLine
    const [gameName, tagLine] = input.split('#');

    // Make API call
    try {
      const response = await axios.get(`http://localhost:8080/riot-api/${gameName}/${tagLine}`);
      handleSearchResult(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      handleSearchResult(null);
    }
  };

  return (
    <div className="landing-container">
      <div className="logo-container">
        <img src={whiteLogo} alt="White TFTutor Logo" className="logo" />
        <span className="title">TFTutor</span>
      </div>
      <div className="search-container">
        <select className="region-select" value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
          <option value="NA">NA</option>
          {/* Add more regions as options here when functioning... */}
        </select>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Search a RiotID #Tagline" value={input} onChange={(e) => setInput(e.target.value)} className="search-input" />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Landing;
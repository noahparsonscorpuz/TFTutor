
import './App.css';
import Landing from './Components/Landing.jsx';
import Profile from './Components/Profile.jsx';
import Matches from './Components/Matches.jsx';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [profileData, setProfileData] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  const fetchProfileData = async (puuid) => { // Modify to accept puuid parameter
    try {
      const response = await axios.get(`http://localhost:8080/player-stats/${puuid}`); // Use dynamic puuid
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (searchResult) { // Check if searchResult is not null
      fetchProfileData(searchResult.puuid); // Pass puuid to fetchProfileData
    }
  }, [searchResult]); // Trigger effect when searchResult changes

  // Function to handle search result
  const handleSearchResult = (data) => {
    setSearchResult(data);
  };

  return (
    <>
      <Landing handleSearchResult={handleSearchResult} />
      {profileData && <Profile profileData={profileData} />}
      {profileData && <Matches profileData={profileData} />}
    </>
  );
}

export default App;
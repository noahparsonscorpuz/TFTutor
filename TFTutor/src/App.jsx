import './App.css';
import Landing from './Components/Landing.jsx';
import Profile from './Components/Profile.jsx';
import Matches from './Components/Matches.jsx';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [profileData, setProfileData] = useState(null);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/player-stats/1bkqBEIe4j1bE6G4RGQX_e99_u8VMO-kPHbVvH0ID_s4iwdLp8N3zpQYnw");
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <>
      <Landing />
      {profileData && <Profile profileData={profileData} />}
      {profileData && <Matches profileData={profileData} />}
    </>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import './Matches.css';
import axios from 'axios';

const Matches = ({ profileData }) => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  const fetchRecentMatches = async (puuid) => {
    try {
      const response = await axios.get(`http://localhost:8080/recent-matches/${puuid}`);
      console.log('Matches data:', response.data);
      setMatches(response.data);
    } catch (error) {
      console.error('Error fetching matches:', error);
      setError('Failed to fetch recent matches');
    }
  };

  useEffect(() => {
    if (profileData && profileData.puuid) {
      fetchRecentMatches(profileData.puuid);
    }
  }, [profileData]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Recent Matches</h2>
      {matches.length > 0 ? (
        <ul>
          {matches.map((matchId, index) => (
            <li key={index}>{matchId}</li>
          ))}
        </ul>
      ) : (
        <div>Loading matches...</div>
      )}
    </div>
  );
};

export default Matches;
import { useState, useEffect} from 'react'
import './App.css'
import axios from "axios"
import Landing from './Landing.jsx';

function App() {
  const [profileData, setProfileData] = useState(null)
  const [matches, setMatches] = useState([]);

  // Fetching summoner details
  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://localhost:8080/player-stats/1bkqBEIe4j1bE6G4RGQX_e99_u8VMO-kPHbVvH0ID_s4iwdLp8N3zpQYnw");
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
 
  useEffect (() => {
    fetchAPI()
  }, [])

  const puuid = profileData ? profileData.puuid : null; // Fetch "puuid" from returned JSON

  // Fetching recent matches using "puuid"
  const fetchRecentMatches = async (puuid) => {
    try {
      const response = await axios.get(`http://localhost:8080/recent-matches/${puuid}`);
      setMatches(response.data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  useEffect(() => {
    if (profileData && profileData.puuid) {
      fetchRecentMatches(profileData.puuid);
    }
  }, [profileData]);

  return (
    <>
      <Landing />
      {profileData && (
        <div>
          <h2>TFT Profile</h2>
          <p><strong>Tier:</strong> {profileData.tier} {profileData.rank}</p>
          <p><strong>League Points:</strong> {profileData.leaguePoints}</p>
          <p><strong>Wins:</strong> {profileData.wins}</p>
          <p><strong>Losses:</strong> {profileData.losses}</p>
          <p><strong>Fresh Blood:</strong> {profileData.freshBlood ? 'Yes' : 'No'}</p>
          <p><strong>Hot Streak:</strong> {profileData.hotStreak ? 'Yes' : 'No'}</p>
          <p><strong>Veteran:</strong> {profileData.veteran ? 'Yes' : 'No'}</p>
          <p><strong>Inactive:</strong> {profileData.inactive ? 'Yes' : 'No'}</p>
          <p><strong>PUUID:</strong> {profileData.puuid}</p>
        </div>
      )}

      {matches.length > 0 && (
        <div className="matches">
          <h2>Recent Matches</h2>
          <ul>
            {matches.map((matchId, index) => (
              <li key={index}>{matchId}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default App
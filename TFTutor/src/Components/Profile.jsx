import React from 'react';
import './Profile.css';

import not_found from '../assets/not_found.png';

import iron from '../assets/rankEmblems/emblem-iron.png';
import bronze from '../assets/rankEmblems/emblem-bronze.png';
import silver from '../assets/rankEmblems/emblem-silver.png';
import gold from '../assets/rankEmblems/emblem-gold.png';
import platinum from '../assets/rankEmblems/emblem-platinum.png';
import emerald from '../assets/rankEmblems/emblem-emerald.png';
import diamond from '../assets/rankEmblems/emblem-diamond.png';
import master from '../assets/rankEmblems/emblem-master.png';
import grandmaster from '../assets/rankEmblems/emblem-grandmaster.png';
import challenger from '../assets/rankEmblems/emblem-challenger.png';

const rankEmblems = {
  IRON: iron,
  BRONZE: bronze,
  SILVER: silver,
  GOLD: gold,
  PLATINUM: platinum,
  EMERALD: emerald,
  DIAMOND: diamond,
  MASTER: master,
  GRANDMASTER: grandmaster,
  CHALLENGER: challenger,
};

const Profile = ({ profileData, searchResult, summonerStyle }) => {
  const generateProfileIconURL = () => {
    const baseURL = 'https://cdn.communitydragon.org/11.1.0/profile-icon/';
    const iconId = summonerStyle?.summoner_icon_id;
    return iconId ? `${baseURL}${iconId}` : not_found;
  }

  const generateRankEmblem = () => {
    const rank = profileData?.tier?.toUpperCase();
    return rankEmblems[rank] || not_found;
  };

  if (!profileData || !searchResult || !summonerStyle) {
    return <div>Loading profile details...</div>;
  }
  
  const winStatistics = () => {
    const { wins, losses } = profileData;
    const matchesPlayed = wins + losses;
  
    // Handle case where no matches are played to avoid division by zero
    if (matchesPlayed === 0) {
      return [0, 0, 0, 0]; // or handle appropriately, maybe return null or NaN
    }
  
    const winRatio = (wins / matchesPlayed) * 100;
    return [wins, losses, winRatio.toFixed(1), matchesPlayed];
  };
  
  
  return (
    <div className="profile-card-container">
    <div className="profile-card" >
      <div className="profile-icon-container">
        <img src={generateProfileIconURL()} alt="Summoner Icon" className="profile-icon" />
        <h2>{searchResult.gameName}#{searchResult.tagLine}</h2>
      </div>
      <div className="profile-details">
        <div className="rank-details">
          <img src={generateRankEmblem()} alt={`${profileData.tier} Emblem`} className="rank-emblem" />
          <p className="lp-details">
            <h1>{profileData.tier} {profileData.rank}</h1>
            <progress value={profileData.leaguePoints} max={100} className="lp-bar"/>
            <p>Tier Progress: {profileData.leaguePoints}</p>
          </p>
        </div>
        <div className="win-statistics">
          <p className="wins" ><strong>Wins:</strong> {winStatistics()[0]}</p>
          <p><strong>Losses:</strong> {winStatistics()[1]}</p>
          <p><strong>Win Percentage:</strong> {winStatistics()[2]}%</p>
          <p><strong>Matches Played:</strong> {winStatistics()[3]}</p>
        </div>
        <p><strong>Summoner Level:</strong> {summonerStyle?.summoner_level}</p>
        <p><strong>Fresh Blood:</strong> {profileData.freshBlood ? 'Yes' : 'No'}</p>
        <p><strong>Hot Streak:</strong> {profileData.hotStreak ? 'Yes' : 'No'}</p>
        <p><strong>Veteran:</strong> {profileData.veteran ? 'Yes' : 'No'}</p>
        <p><strong>Inactive:</strong> {profileData.inactive ? 'Yes' : 'No'}</p>
        <p><strong>PUUID:</strong> {profileData.puuid}</p>
      </div>
    </div>
  </div>
  );
};

export default Profile;
import React from 'react';
import './Profile.css';

import not_found from '../assets/not_found.png';

import iron from '../assets/rankEmblems/emblem-iron.png';
import bronze from '../assets/rankEmblems/emblem-bronze.png';
import silver from '../assets/rankEmblems/emblem-silver.png';
import gold from '../assets/rankEmblems/emblem-gold.png';
import platinum from '../assets/rankEmblems/emblem-platinum.png';
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
  
  return (
    <div className="profile-card-container">
    <div className="profile-card">
      <div className="profile-icon-container">
        <img src={generateProfileIconURL()} alt="Summoner Icon" className="profile-icon" />
      </div>
      <div className="profile-details">
        <h2>{searchResult.gameName}#{searchResult.tagLine}</h2>
        <img src={generateRankEmblem()} alt={`${profileData.tier} Emblem`} className="rank-emblem" />
        <p><strong>Summoner Level:</strong> {summonerStyle?.summoner_level}</p>
        <p><strong>Tier:</strong> {profileData.tier} {profileData.rank}</p>
        {/*
        <p><strong>League Points:</strong> {profileData.leaguePoints}</p>
        <p><strong>Wins:</strong> {profileData.wins}</p>
        <p><strong>Losses:</strong> {profileData.losses}</p>
        <p><strong>Fresh Blood:</strong> {profileData.freshBlood ? 'Yes' : 'No'}</p>
        <p><strong>Hot Streak:</strong> {profileData.hotStreak ? 'Yes' : 'No'}</p>
        <p><strong>Veteran:</strong> {profileData.veteran ? 'Yes' : 'No'}</p>
        <p><strong>Inactive:</strong> {profileData.inactive ? 'Yes' : 'No'}</p>
        <p><strong>PUUID:</strong> {profileData.puuid}</p>
      */}
      </div>
    </div>
  </div>
  );
};

export default Profile;
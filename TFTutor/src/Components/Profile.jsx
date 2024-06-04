import React from 'react';
import './Profile.css';

const Profile = ({ profileData, searchResult, summonerStyle}) => {
  if (!profileData) {
    return <div>Loading profile details...</div>;
  }

  return (
    <div>
      <h2>TFT Profile</h2>
      <p><strong>Summoner:</strong> {searchResult.gameName}#{searchResult.tagLine}</p>
      <p><strong>Summoner Icon ID:</strong> {summonerStyle.summoner_icon_id}</p>
      <p><strong>Summoner Level:</strong> {summonerStyle.summoner_level}</p>
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
  );
};

export default Profile;
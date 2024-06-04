import React from 'react';
import './Profile.css';

const Profile = ({ profileData }) => {
  if (!profileData) {
    return <div>Loading profile details...</div>;
  }

  return (
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
  );
};

export default Profile;

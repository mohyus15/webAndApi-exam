import React, { useContext } from 'react';
import { authContext } from '../store/userContext';

function Profile() {
  const { user } = useContext(authContext);

  return (
    <div>
      <h1>Profile Page</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
}

export default Profile;

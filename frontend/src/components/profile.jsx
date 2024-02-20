import React, { useContext, useState } from 'react';
import { authContext } from '../store/userContext';
import UserProfile from './UserProfile'; 
function Profile() {
  const { user } = useContext(authContext);
  const [showUpdateForm, setShowUpdateForm] = useState(false); 

  const handleProfileUpdate = async (formData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        console.log(updatedUser);
        alert('Profile updated successfully');
        setShowUpdateForm(false);
      } else {
        console.error('Failed to update profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>you Admin: {user?.isAdmin}</p>
          <p>you ID: {user._id}</p>
          {showUpdateForm ? (
            <UserProfile  onUpdate={handleProfileUpdate}  />
          ) : (
            <button onClick={() => setShowUpdateForm(true)} style={{backgroundColor: "green"}}>Update Profile</button>
          )}
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
}

export default Profile;

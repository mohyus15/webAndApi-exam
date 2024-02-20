import React, { useState } from 'react';

const UserProfile = ({ onUpdate }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onUpdate(formData); // Call the onUpdate function with the form data
  };

  return (
    <div>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <br />
        <button type="submit"  style={{backgroundColor: "green", borderRadius: "15%"}}>Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;

import React, { useEffect, useState } from 'react';
import './Sidebar.css'; // Import your CSS file for styling

const Sidebar = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users from the backend API
    fetch('http://localhost:8080/api/users')
      .then(response => response.json())
      .then(data => {
        // Filter out users who are not admin
        const nonAdminUsers = data.filter(user => !user.isAdmin);
        setUsers(nonAdminUsers);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleUserSelect = (user) => {
    onUserSelect(user);
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-heading">All Users (Non-admin)</h2>
      <ul className="user-list">
        {users.map(user => (
          <li key={user._id} className="user-item" onClick={() => handleUserSelect(user)}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

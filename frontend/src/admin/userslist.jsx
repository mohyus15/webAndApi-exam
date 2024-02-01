import React, { useState, useEffect } from 'react';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = (userId) => {
    console.log(`Deleting user with ID: ${userId}`);
  };

  const handleUpdate = (userId) => {
    console.log(`Updating user with ID: ${userId}`);
  };

  return (
    <div>
      <h2>User Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleUpdate(user.id)}>Update</button>
              </td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

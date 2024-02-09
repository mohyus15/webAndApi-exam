import React, { useState, useEffect } from 'react';
import './UserTable.css'; // Import the CSS file
import UpdateButton from './UpdateUserPage';
import { useParams } from 'react-router-dom';
import { authContext } from '../store/userContext';
import { delete_user } from '../store/types';
import { useContext } from 'react';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const { userId } = useParams();
  const { dispatch } = useContext(authContext);

  useEffect(() => {
    fetch('http://localhost:8080/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = async (userIdToDelete) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userIdToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const json = await response.json();
        dispatch({ type: delete_user, payload: json });
        setUsers(users.filter(user => user._id !== userIdToDelete));
      } else {
        console.error('Failed to delete user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdate = (userIdToUpdate) => {
    console.log(`Updating user with ID: ${userIdToUpdate}`);
  };

  return (
    <div>
      <h2>User Table</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <UpdateButton userId={user._id} onUpdate={handleUpdate} />
              </td>

              <td>
                <button className="delete-button" onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

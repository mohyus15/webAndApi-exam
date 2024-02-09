import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import './UpdateUser.css';
import { authContext } from '../store/userContext';

const UpdateUser = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });

  const { dispatch } = useContext(authContext);
  const history = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/users/${userId}`)
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        console.log('User data updated successfully');
        dispatch({ type: 'UPDATE_USER', payload: userData });
        history('/userslist');
      } else {
        console.error('Failed to update user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="update-user-container">
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;

// Navigation.js

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../components/logout';
import { authContext } from '../store/userContext';
import { FaUsers, FaList, FaPlus, FaInbox } from 'react-icons/fa';
import '../../src/index.css';

function Navigation() {
  const { user } = useContext(authContext);
  const { logout } = useLogout();

  const logOutHandler = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">Home</Link>

        {user && user.isAdmin && (
          <div>
            <span className="email">{user.email}</span>
            <div className="dropdown" title="Lists" id="adminMenu">
              <button className="dropbtn">Admin Menu</button>
              <div className="dropdown-content">
                <Link to="/userslist">
                  <FaUsers /> User List
                </Link>
                <Link to="/productListAdmin">
                  <FaList /> Product List
                </Link>
                <Link to="/admin/createProduct">
                  <FaPlus /> Create Product
                </Link>
                <Link to="/admin/chatbox">
                  <FaInbox /> Inbox
                </Link>
                <button onClick={logOutHandler} className="logout-btn">
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {user && !user.isAdmin && (
          <div>
            <span className="email">{user.email}</span>
            <div className="dropdown" title="Lists" id="adminMenu">
              <button className="dropbtn">menu</button>
              <div className="dropdown-content">
                <Link to="/components/Anonse">
                  Anonse
                </Link>
				<Link to="/components/chat">
                  chat with admin
                </Link>

                <button onClick={logOutHandler} className="logout-btn">
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {!user && (
          <div>
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navigation;

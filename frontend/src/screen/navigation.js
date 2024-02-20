import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../components/logout';
import { authContext } from '../store/userContext';
import { FaUsers,  FaPlus, FaInbox } from 'react-icons/fa';
import { IoIosNotifications } from "react-icons/io";
import io from 'socket.io-client';

function Navigation() {
  const { user} = useContext(authContext);
  const { logout } = useLogout();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const socket = io('http://localhost:8900', {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('New article created', () => {
      setNotificationCount(prevCount => prevCount + 1);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const logOutHandler = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link style={{ fontFamily: "serif", fontWeight: 'bold', textDecoration: 'none' }} to="/"><h4>Oslo Times</h4></Link>

        {user && user.isAdmin && (
          <div className="admin-menu">
            <span className="email">{user.name}</span>
            <div className="dropdown" title="Lists" id="adminMenu">
              <button className="dropbtn">Admin Menu</button>
              <div className="dropdown-content">
              <Link to="/components/ArtclesForEachUser">YourArticles</Link>

                <Link to="/userslist">
                  <FaUsers /> User List
                </Link>
                <Link to="/admin/createArticle">
                  <FaPlus /> Create news Article
                </Link>
                <Link to="/admin/Message">
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
          <div className="user-menu">
            <Link to="/components/Notifications" style={{ position: 'relative' }}>
              <IoIosNotifications size={30} style={{ backgroundColor: 'blue', color: 'white', borderRadius: '50%', marginLeft: '10px' }} />
              {notificationCount > 0 && <span style={{ position: 'absolute', top: '-10px', right: '-10px', backgroundColor: 'red', borderRadius: '50%', padding: '5px', color: 'white', fontSize: '12px' }}>{notificationCount}</span>}
            </Link>
            <span className="email">
              {user.name}
            </span>
            <div className="dropdown" title="Lists" id="adminMenu">
              <button className="dropbtn">menu</button>
              <div className="dropdown-content">
        
                <Link to="/components/profile">
                  your profile
                </Link>
                <Link to="/components/MessageForUsers">
                  chat with admin
                </Link>
                <Link to="/components/Notifications">
                  Notifications
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

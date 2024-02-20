import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:8900', {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('New article created', () => {
      setNotifications(prevNotifications => [...prevNotifications, 'New article created']);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('error', (err) => {
      setError(err);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;

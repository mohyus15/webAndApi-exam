import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('/', {
  reconnection: true
});

function Chat() {
  useEffect(() => {
    console.log('socket io', socket);
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>chat</div>
  );
}

export default Chat;

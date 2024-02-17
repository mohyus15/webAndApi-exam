import React, { useEffect, useState, useContext, useRef } from 'react';
import io from 'socket.io-client';
import './Message.css';
import Sidebar from './Sidebar';
import { authContext } from '../store/userContext';

const socket = io('http://localhost:8900', { transports: ['websocket'] });

function Message() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useContext(authContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on('messageFromAdmin', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedUser) {
        try {
          const response = await fetch(`http://localhost:8080/api/message/${selectedUser._id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch messages');
          }
          const data = await response.json();
          setMessages(data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchData();
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (newMessage.trim() !== '' && selectedUser) {
      const data = {
        chatId: selectedUser._id,
        senderId: user._id,
        text: newMessage.trim(), 
      };
      try {
        const response = await fetch('http://localhost:8080/api/message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error('Failed to send message');
        }
        setMessages(prevMessages => [...prevMessages, { text: newMessage.trim(), senderId: user._id }]);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    } else {
      console.error('No user selected or message is empty');
    }
  };

  return (
    <div className="container">
      <Sidebar onUserSelect={(user) => {
        console.log('User clicked:', user);
        setSelectedUser(user);
      }} />
      <div className="message-container">
        <h1>Chat with users</h1>
        {selectedUser && selectedUser.name}
        <div style={{ height: '400px', overflowY: 'auto' }}>
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.senderId === user._id ? 'sent-message' : 'received-message'}`}
            >
              {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-container">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            className="message-textarea"
          />
          <button onClick={sendMessage} className="send-button">Send</button>
        </div>
      </div>
    </div>
  );
}

export default Message;

import React, { useState, useEffect, useContext, useRef } from 'react';
import io from 'socket.io-client';
import { authContext } from '../store/userContext';
import './MessageForUsers.css';
import { messages_url } from '../api/api';

const BACKEND_URL = messages_url;

function MessageForUsers() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useContext(authContext);
  const messagesEndRef = useRef(null);
  const latestTextRef = useRef(null);
  const socketRef = useRef();

  useEffect(() => {
    // Establish socket connection
    socketRef.current = io(BACKEND_URL, { transports: ['websocket'] });
    const socket = socketRef.current;

    socket.on('messageFromAdmin', (message) => {
      // Update messages state with the new message
      setMessages(prevMessages => [...prevMessages, message]);
      scrollToLatestMessage();
    });

    return () => {
      // Clean up socket connection when component unmounts
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Fetch initial messages from the backend
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/message/${user._id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchData();
  }, [user._id]);

  useEffect(() => {
    // Scroll to the latest message whenever messages state changes
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (messageText) => {
    if (messageText.trim() !== '') {
      const data = {
        chatId: user._id,
        senderId: user._id,
        text: messageText.trim() 
      };

      const socket = socketRef.current;
      socket.emit('sendMessage', data);

      // No need to wait for backend response to update UI
      setMessages(prevMessages => [...prevMessages, data]);
      scrollToLatestMessage();

      // Clear input field after sending message
      setNewMessage('');
    }
  };

  const scrollToLatestMessage = () => {
    if (latestTextRef.current) {
      latestTextRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat with admin</h2>
      <div className="chat-messages">
        <div style={{ height: '400px', width: '500px', overflowY: 'auto' }}>
          {messages.filter(message => message.chatId === user._id).map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.senderId === user._id ? 'sent-message' : 'received-message'}`}
              ref={index === messages.length - 1 ? latestTextRef : null} 
            >
              {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="chat-input">
        <input 
          type="text" 
          placeholder="Type your message here..." 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage(e.target.value);
            }
          }} 
        />
        <button onClick={() => sendMessage(newMessage)}>Send</button>
      </div>
    </div>
  );
}

export default MessageForUsers;

import React, { useState, useEffect, useContext, useRef } from 'react';
import io from 'socket.io-client';
import { authContext } from '../store/userContext';
import './MessageForUsers.css';

const WEBSOCKET_URL = 'ws://localhost:8900';

function MessageForUsers() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useContext(authContext);
  const messagesEndRef = useRef(null);
  const latestTextRef = useRef(null);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(WEBSOCKET_URL, { transports: ['websocket'] });
    const socket = socketRef.current;

    socket.on('messageFromAdmin', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
      scrollToLatestMessage();
    });

    socket.on('typingIndicator', ({ userId, isTyping }) => {
      console.log(`User ${userId} is typing: ${isTyping}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleTyping = () => {
    // Send typing indicator to the WebSocket server
    socketRef.current.emit('typingIndicator', { userId: user._id, isTyping: true });

    // Set a timeout to send another indicator after a certain period of inactivity (e.g., 1 second)
    setTimeout(() => {
      socketRef.current.emit('typingIndicator', { userId: user._id, isTyping: false });
    }, 1000);
  };

  const sendMessage = async () => {
    if (newMessage.trim() !== '') {
      const data = {
        chatId: user._id,
        senderId: user._id,
        text: newMessage.trim() 
      };

      try {
        // Send message data to the backend API
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

        // Emit the message to the WebSocket server
        const socket = socketRef.current;
        socket.emit('sendMessage', data);

        // No need to wait for backend response to update UI
        setMessages(prevMessages => [...prevMessages, data]);
        scrollToLatestMessage();

        // Clear input field after sending message
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
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
          onInput={handleTyping} 
        />
        <button onClick={() => sendMessage(newMessage)}>Send</button>
      </div>
    </div>
  );
}

export default MessageForUsers;

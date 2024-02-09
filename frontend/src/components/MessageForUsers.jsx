import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { authContext } from '../store/userContext';
import "../components/message.css";

const socket = io("http://localhost:8000");

const UserComponent = () => {
  const { user } = useContext(authContext);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users');
        const data = await response.json();

        const isAdminUsers = data.filter(user => user.isAdmin);

        if (isAdminUsers.length > 0) {
          setUserData(isAdminUsers);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userData]); // Add userData as dependency

  const handleSendMessage = async () => {
    try {
      for (const receiverUser of userData) {
        const receiverId = receiverUser._id;
        socket.emit("sendMessage", { senderId: user._id, receiverId, text: message });

        await fetch("http://localhost:8080/api/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId: receiverId,
            senderId: user._id,
            text: message,
          }),
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <h2>Chat with Admin</h2>
      </div>
      <div className="chatbox-messages">
        {/* Display messages here */}
      </div>
      <div className="chatbox-input">
        <textarea
          id="message"
          className="message-input"
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="send-button" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default UserComponent;

import React, { useContext, useEffect, useState, useRef } from "react";
import Conversation from "../components/conversation";
import "./message.css";
import Messages from "../components/message/Messages";
import ChatOnline from "../components/ChatOnline";
import { authContext } from '../store/userContext';
import { io } from "socket.io-client";

export default function Message() {
  const { user } = useContext(authContext);
  
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messagesArr, setMessagesArr] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();



  useEffect(() => {
    socket.current = io("ws://localhost:8000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/chat/' + user._id);
        const data = await res.json();
        setConversations(data);
      } catch (error) {
        console.log(error);
      }
    };

    getConversation();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res2 = await fetch('http://localhost:8080/api/message/' +user._id);
        const data2 = await res2.json();
        
        if (Array.isArray(data2)) {
          setMessagesArr(data2);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getMessages();
  }, [user]);

  const obj ={
    senderId: user._id,
    text: newMessage,
    currentChat:user._id,


  }
  const handelSubmit = async (e) => {
    e.preventDefault()
    console.log(currentChat)
    try {
      const response = await fetch('http://localhost:8080/api/message/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });
    } catch (error) {
      console.error('Network error:', error);
    }
    setNewMessage(" ")

  }

  return (
    <>
      <div className="messanger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="search" className="chatInputBox" />
            <p>all admin people are here</p>
            {conversations &&
              conversations.map((conversation) => (
                <div onClick={() => setCurrentChat(conversation)} key={conversation._id}>
                  <Conversation conversation={conversation} currentUser={user._id} />
                </div>
              ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxuWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messagesArr.length > 0 ? (
                    messagesArr.map((message) => (
                      <Messages key={message._id} message={message} own={message.senderId === user._id} />
                    ))
                  ) : (
                    <span>Loading messages...</span>
                  )}
                </div>
              </>
            ) : (
              <span>Open a conversation to chat with others</span>
            )}
          </div>
          <div className="chatBoxButton">
            <textarea
              className="chatmessageInput"
              placeholder="Send a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            ></textarea>
            <button className="chatSubmitButton" onClick={handelSubmit}>Send</button>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}

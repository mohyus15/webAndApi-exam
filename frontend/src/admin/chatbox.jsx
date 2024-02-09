import React from "react";
import "./ChatBox.css";
import { useRef } from "react";
import InputEmoji from 'react-input-emoji'

const ChatBox = () => {
    const imageRef = useRef();



      // Send Message
  const handleSend = async(e)=> {
    console.log('hello')
  }
  return (
    <div className="ChatBox-container">
      <div className="chat-header">
        <div className="follower">
          <div className="name" style={{ fontSize: "0.9rem" }}>
            <span>Username</span>
          </div>
        </div>
        <hr style={{ width: "95%", border: "0.1px solid #ececec", marginTop: "20px" }} />
      </div>
      <div className="chat-body">
        <div className="message own">
          <span>Sample Message Text</span>
        </div>
      </div>
      <div className="chat-sender">
        <div onClick={() => imageRef.current.click()}>+</div>
        <InputEmoji value={""} onChange={() => {}} />
        <div className="send-button button" onClick={handleSend}>Send</div>
        <input type="file" name="" id="" style={{ display: "none" }} ref={imageRef} />
      </div>
    </div>
  );
};

export default ChatBox;

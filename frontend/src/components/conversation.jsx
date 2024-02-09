import { useEffect, useState } from "react";
import "../components/conversation.css";

const Conversation = ({ conversation, currentUser }) => {
  console.log(currentUser)
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/users/${friendId}`);
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          console.error(`Failed to fetch user data. Status: ${res.status}`);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    if (friendId) {
      getUser();
    }
  }, [currentUser, conversation]);

  if (!user) {
    return null;
  }

  return (
    
    <div className="conversation">
      
      <img
        className="conversationImg"
        src="https://images.unsplash.com/photo-1579273166674-bea9b40ba0f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTl8fFBST0ZJTEUlMjBQSUNUVVJFJTIwJTIwJTIwV0lUSCUyME5PJTIwUElDVFVSRXxlbnwwfHwwfHx8MA%3D%3D"
        alt=""
      />
    
      <span className="conversationName">{user.name}</span>
    </div>
  );
};

export default Conversation;

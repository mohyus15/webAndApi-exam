const io = require("socket.io")(8000, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let users = [];
  let admins = [];
  
  const addUser = (userId, socketId, isAdmin) => {
    const user = { userId, socketId };
  
    if (isAdmin) {
      admins.push(user);
    } else {
      users.push(user);
    }
  
    return user;
  };
  
  const removeUser = (socketId, isAdmin) => {
    if (isAdmin) {
      admins = admins.filter((admin) => admin.socketId !== socketId);
    } else {
      users = users.filter((user) => user.socketId !== socketId);
    }
  };
  
  const getUser = (userId, isAdmin) => {
    const userList = isAdmin ? admins : users;
    return userList.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    // when connect
    console.log("a user connected.");
  
    // take userId, socketId, and isAdmin from user
    socket.on("addUser", ({ userId, isAdmin }) => {
      const user = addUser(userId, socket.id, isAdmin);
  
      if (isAdmin) {
        // Admin joins the admin room
        socket.join("adminRoom");
      } else {
        // User joins their own room based on userId
        socket.join(`userRoom-${userId}`);
      }
  
      io.emit("getUsers", { users, admins });
    });
  
    // send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId, false); // Get user, not admin
  
      if (user) {
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
      } else {
        console.log("User not found.");
      }
    });
  
    // when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
  
      // Determine if the disconnected user is an admin or not
      const isAdmin = admins.some((admin) => admin.socketId === socket.id);
  
      removeUser(socket.id, isAdmin);
  
      io.emit("getUsers", { users, admins });
  
      if (isAdmin) {
        // Admin leaves the admin room
        socket.leave("adminRoom");
      }
    });
  });
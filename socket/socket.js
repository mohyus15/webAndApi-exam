const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer();
const io = new Server(server, {
  transports: ['websocket'],
  cors: {
    origin: "http://localhost:3000",
  },
});

const users = {};
const admins = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("userConnected", (userId) => {
    // Store connected user
    users[userId] = socket.id;
    console.log("User connected:", userId);
  });

  socket.on("adminConnected", (adminId) => {
    // Store connected admin
    admins[adminId] = socket.id;
    console.log("Admin connected:", adminId);
  });

  socket.on("sendMessageToAdmin", ({ userId, adminId, message }) => {
    // Forward message to admin
    const adminSocketId = admins[adminId];
    if (adminSocketId) {
      io.to(adminSocketId).emit("messageFromUser", { userId, message });
    } else {
      console.log("Admin not found");
    }
  });

  socket.on("sendMessageToUser", ({ adminId, userId, message }) => {
    // Forward message to user
    const userSocketId = users[userId];
    if (userSocketId) {
      io.to(userSocketId).emit("messageFromAdmin", { adminId, message });
    } else {
      console.log("User not found");
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    // Remove disconnected user/admin from stored data
    const userId = Object.keys(users).find((key) => users[key] === socket.id);
    if (userId) {
      delete users[userId];
    }
    const adminId = Object.keys(admins).find(
      (key) => admins[key] === socket.id
    );
    if (adminId) {
      delete admins[adminId];
    }
  });
});

server.listen(8900, () => {
  console.log("Socket server listening on port 8900");
});

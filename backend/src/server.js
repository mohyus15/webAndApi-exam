const http = require('http');
const app = require('./app.js');
require('dotenv').config();
const {  mongooseConnect } = require('./utils/database.js');
const port = process.env.PORT || 8080;
const mode = process.env.NODE_ENV;
const server = http.createServer(app);

//const { Server } = require("socket.io");
//const io = new Server(server);



/*


io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
});

const socketServer = async () => {
  await   mongooseConnect();
  server.listen(port, () => {
    console.log(`the mode is ${mode} and listening to ${port}...`);
  });
};

socketServer();
*/


const startServer = async () => {
  await  mongooseConnect();
  server.listen(port, () => {
    console.log(`the mode is ${mode} and lisning to ${port}... `);
  });
};
startServer();

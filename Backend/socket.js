const { Server } = require('socket.io');
const user = require('./models/user.model'); // Adjust the path as necessary
const captain= require('./models/captain.model'); // Adjust the path as necessary

let io = null;

/**
 * Initializes the Socket.IO server.
 * @param {http.Server} server - The HTTP server instance.
 */
function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join', async (data) => {
      const { userId, role } = data;
      if (role === 'user') {
        await user.findByIdAndUpdate(userId, { socketId: socket.id });
       
      } else if (role === 'captain') {
        await captain.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}

/**
 * Sends a message to all connected clients or a specific socket.
 * @param {string} event - The event name.
 * @param {any} message - The message/data to send.
 * @param {string} [socketId] - Optional socket ID to send to a specific client.
 */
function sendMessage(event, message, socketId) {
  if (!io) {
    console.error('Socket.io not initialized');
    return;
  }
  if (socketId) {
    io.to(socketId).emit(event, message);
  } else {
    io.emit(event, message);
  }
}

module.exports = {
  initializeSocket,
  sendMessage,
};
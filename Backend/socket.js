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
        console.log(`User with ID ${userId} and role ${role} joined with socket ID: ${socket.id}`);
      if (role === 'user') {
        await user.findByIdAndUpdate(userId, { socketId: socket.id });
       
      } else if (role === 'captain') {
        await captain.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on('updateLocation', async(data) => {
        const { userId, location } = data;

        // Check for valid location data (latitude and longitude)
        if (!location || typeof location.ltd !== 'number' || typeof location.lng !== 'number') {
            console.error('Invalid location data:', location);
            return;
        }

        try {
            await captain.findByIdAndUpdate(userId,  { location: {
                ltd: location.ltd,
                lng: location.lng
            } } );
        } catch (err) {
            console.error('Error updating captain location:', err);
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
function sendMessage(socketId, message) {
  if (!io) {
    console.error('Socket.io not initialized');
    return;
  }
  console.log(`Sending message: ${message.event} to socket ID: ${socketId || 'all'}`);
  if (socketId) {
    io.to(socketId).emit(message.event, message.data);
  } else {
    io.emit(message.event, message.data);
  }
}

module.exports = {
  initializeSocket,
  sendMessage,
};
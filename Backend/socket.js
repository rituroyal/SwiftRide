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

    
  
    const rideModel = require('./models/ride.model');

socket.on('user-location-update', async ({ userId, latitude, longitude }) => {
  console.log(`📡 Received live location from user ${userId}:`, latitude, longitude);

  try {
    // Update user's live location
    await user.findByIdAndUpdate(userId, {
      location: {
        ltd: latitude,
        lng: longitude
      }
    });

    // Get active ride with this user
    const activeRide = await rideModel.findOne({
      user: userId,
      status: 'ongoing'
    }).populate('captain');

    if (activeRide && activeRide.captain?.socketId) {
      io.to(activeRide.captain.socketId).emit('user-location', {
        userId,
        latitude,
        longitude
      });
      console.log(`📤 Sent location to captain ${activeRide.captain.socketId}`);
    } else {
      console.warn(`⚠️ No active ride or captain found for user ${userId}`);
    }

  } catch (err) {
    console.error('Error updating user location:', err);
  }
});

    

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
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
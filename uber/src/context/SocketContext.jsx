import React, { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext(null);

const SOCKET = io(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3000'}`); // Adjust the URL as needed

const SocketProvider = ({ children }) => {
 

  useEffect(() => {
    // Connect to the server
    

    SOCKET.on('connect', () => {
      console.log('Connected to socket server:', SOCKET.id);
    });

    SOCKET.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    
  }, []);

  // Send a message to a specific event
  const sendMessage = (eventName, data) => {
    if (SOCKET) {
      SOCKET.emit(eventName, data);
    }
  };

  // Listen for messages from a specific event
  const receiveMessage = (eventName, callback) => {
    if (SOCKET) {
      SOCKET.on(eventName, callback);
    }
    // Optionally, return a cleanup function
    return () => {
      if (SOCKET) {
        SOCKET.off(eventName, callback);
      }
    };
  };

  return (
    <SocketContext.Provider value={{ sendMessage, receiveMessage, socket: SOCKET }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
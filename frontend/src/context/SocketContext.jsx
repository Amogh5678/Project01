import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Create context
export const SocketContext = createContext({ socket: null, isConnected: false });

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_BASE_URL, {
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            timeout: 10000
        });

        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('✅ Connected to server');
            setIsConnected(true);
        });

        newSocket.on('disconnect', (reason) => {
            console.log(`⚠️ Disconnected from server: ${reason}`);
            setIsConnected(false);
        });

        newSocket.on('connect_error', (err) => {
            console.error(`❌ Connection error: ${err.message}`);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;

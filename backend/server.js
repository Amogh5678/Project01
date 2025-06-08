import http from 'http'
import app from './app.js';
import { initializeSocket } from './socket.js';

const port = process.env.PORT || 4000;

// Create HTTP server
const httpServer = http.createServer(app);

// Initialize socket server
initializeSocket(httpServer);

httpServer.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
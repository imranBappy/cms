const express = require('express');
const { createServer } = require('http');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const PORT = process.env.PORT || 3000;

nextApp.prepare().then(() => {
  const app = express();
  const server = createServer(app);
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('component-built', () => {
      console.log('New component built, notifying client');
      socket.emit('reload-component');
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  // Handle all other routes with Next.js
  app.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });

}).catch(err => {
  console.error("Error preparing the app:", err);
  process.exit(1);
});

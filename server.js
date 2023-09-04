// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve your frontend (build folder) if applicable
app.use(express.static('public')); // Adjust the path to your frontend build folder

// WebSocket connection handling
wss.on('connection', (ws) => {
  // Handle WebSocket messages here
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
  });

  // Send a welcome message when a client connects
  console.log("Connected to the WebSocket server.");
  ws.send('Connected to the WebSocket server.');
});

// Create an endpoint to receive Webhook.site requests
app.post('/webhook', (req, res) => {
  // Handle incoming Webhook.site requests here
  console.log('Received a request from Webhook.site');
  // You can process the data and send updates to connected WebSocket clients here
  wss.clients.forEach((client) => {
    console.log(client)
    client.send('New request received from Webhook.site');
  });
  res.status(200).send('Request received');
});

// Start the HTTP server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

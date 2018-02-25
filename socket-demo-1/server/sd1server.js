const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 3100;
const index = require("./routes/app");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);


var oi = require('socket.io-client');

var socket = oi.connect('http://localhost:3200', {reconnect: true});
console.log('2');
// Add a connect listener
socket.on('connect', function(socket) { 
  console.log('Connected!');
});





io.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket),
    10000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});
const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      "https://api.darksky.net/forecast/84c6deb29aaaa73d725984c8194c258a/33.1032,-96.6706"
    );
    socket.emit("FromAPI", res.data.currently.temperature);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};
server.listen(port, () => console.log(`Listening on port ${port}`));
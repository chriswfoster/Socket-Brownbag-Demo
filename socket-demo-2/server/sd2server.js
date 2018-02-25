const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 3200;
const index = require("./routes/app");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);


///////////////////////////////////////////// This is where I listen to the other server.
var oi = require('socket.io-client');

var socket = oi.connect('http://localhost:3100', {reconnect: true});
console.log('2');
// Add a connect listener
socket.on('FromSD1', function(data) { 
  
  sd1text = data.data1
});
let sd1text = "waiting on message 1..."





///////////////////////////////////////////// This is where I broadcast the socket.
let interval;
io.on("connection", socket => {
    if (interval) {
        clearInterval(interval);
      }
    intervalId = setInterval(
        () => getApiAndEmit(socket),
        5000
      );
      socket.on("disconnect", () => { 
        console.log("Client disconnected")
          clearInterval(intervalId)});
});

const getApiAndEmit = async socket => {
  try {
    const sd2obj = {
        data2: "This is the SD2 message",
        data1: sd1text
    }
    console.log(sd2obj)
    socket.emit("FromSD2", sd2obj);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};











server.listen(port, () => console.log(`Listening on port ${port}`));
const express = require("express")
const http = require("http")
const socketIo = require("socket.io")
const axios = require("axios")
const port = process.env.PORT || 3100
const index = require("./routes/app")
const app = express()
app.use(index)
const server = http.createServer(app)
const io = socketIo(server)
const oi = require("socket.io-client")




var socket = oi.connect("http://localhost:3200", { reconnect: true })
console.log("2")
// Add a connect listener
socket.on("FromSD2", function(data) {
  console.log(data)
  data ? (sd2text = data.data2) : null
})
let sd2text = "waiting on response 2..."




let interval;
io.on("connection", socket => {
    if (interval) {
        clearInterval(interval);
      }
  intervalId = setInterval(() => getApiAndEmit(socket), 5000)

  socket.on("disconnect", () => {
    console.log("Client disconnected")
    clearInterval(intervalId)
  })
})

const getApiAndEmit = async socket => {
  try {
    const sd1obj = {
      data1: "This is the SD1 Message",
      data2: sd2text
    }
    socket.emit("FromSD1", sd1obj)
    // console.log(sd1obj)
  } catch (error) {
    console.error(`Error: ${error.code}`)
  }
}
server.listen(port, () => console.log(`Listening on port ${port}`))

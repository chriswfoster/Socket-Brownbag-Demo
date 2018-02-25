import React, { Component } from "react"
import socketIOClient from "socket.io-client"
class App extends Component {
  constructor() {
    super()
    this.state = {
      response1: false,
      response2: false,
      endpoint: "http://127.0.0.1:3100"
    }
  }
  componentDidMount() {
    const { endpoint } = this.state
    const socket = socketIOClient(endpoint)
    socket.on("FromSD1", data =>
      this.setState({ response1: data.data1, response2: data.data2 })
    )
    console.log("Server 1")
  }
  render() {
    const { response1, response2 } = this.state
    return (
      <div style={{ textAlign: "center" }}>
        {response1 ? (
          <div>
            <p>Here is server 1 response: {response1}</p>
            <p>Here is server 2 response: {response2}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }
}
export default App

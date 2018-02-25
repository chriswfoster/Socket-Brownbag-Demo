import React, { Component } from "react"
import socketIOClient from "socket.io-client"
class App extends Component {
  constructor() {
    super()
    this.state = {
      response2: false,
      response1: false,
      endpoint: "http://127.0.0.1:3200"
    }
  }
  componentDidMount() {
    const { endpoint } = this.state
    const socket = socketIOClient(endpoint)
    socket.on("FromSD2", data =>
      this.setState({ response1: data.data1, response2: data.data2 })
    )
  }
  render() {
    const { response1, response2 } = this.state
    return (
      <div style={{ textAlign: "center" }}>
        {response1 ? (
          <div>
            <p>Server 1 data: {response1}.</p>
            <p>Server 2 data: {response2}.</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }
}
export default App

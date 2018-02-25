import React, { Component } from "react";
import socketIOClient from "socket.io-client";
class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:3100"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromSD1", data => console.log(data) && this.setState({ response: data }));
  }
  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {response
          ? <p>
              The temperature in Allen is: {response} °F
              And the info from the other server is:
            </p>
          : <p>Loading...</p>}
      </div>
    );
  }
}
export default App;
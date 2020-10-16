import React, { Component } from "react";
import "./App.css";
import PCB from "./views/PCB";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <PCB />
      </div>
    );
  }
}

export default App;

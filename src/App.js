import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { Container } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Container as="main">
          <AddTask />
          <Tasks />
        </Container>
      </div>
    );
  }
}

export default App;

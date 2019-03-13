import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { API_HOST, DEVELOPER_NAME } from "../config";
import axios from "axios";

class AddTask extends Component {
  state = {
    email: "",
    username: "",
    text: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    const bodyFormData = new FormData();
    bodyFormData.set('email', this.state.email);
    bodyFormData.set('username', this.state.username);
    bodyFormData.set('text', this.state.text);
    axios
      .post(`${API_HOST}/create/?${DEVELOPER_NAME}`, bodyFormData)
      .then(({ data }) => {
        alert("Your task was added")
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({[name]: value});
  };

  render() {
    return (
      <>
        <Form onSubmit={e => this.handleSubmit(e)} className="task-form">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={e => this.handleChange(e)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicusername">
            <Form.Label>User name</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="User name"
              value={this.state.username}
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicText">
            <Form.Label>Task</Form.Label>
            <Form.Control
              as="textarea"
              name="text"
              type="text"
              placeholder="Task"
              value={this.state.text}
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

export default AddTask;

import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { logIn } from "../redux/actions/auth";
import { connect } from "react-redux";

class HeaderComponent extends Component {
  state = {
    isModalOpen: false,
    login: "",
    password: ""
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleLogin = () => {
    const { login, password } = this.state;
    if (login === "admin" && password === "123") {
      this.props.logIn();
      this.setState({ isModalOpen: false, login: "", password: "" })
    } else {
      alert("Wrong login or password!");
    }
  };

  render() {
    const { loggedIn } = this.props.auth;
    return (
      <header className="App-header">
        {loggedIn ? null : (
          <Button
            onClick={() => this.setState({ isModalOpen: true })}
            variant="light"
            className="login-btn"
          >
            Login
          </Button>
        )}
        <h1>Task manager</h1>
        <Modal
          show={this.state.isModalOpen}
          onHide={() => this.setState({ isModalOpen: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formLogin">
                <Form.Label>Login</Form.Label>
                <Form.Control
                  name="login"
                  type="text"
                  placeholder="Enter login"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ isModalOpen: false })}
            >
              Close
            </Button>
            <Button variant="primary" onClick={this.handleLogin}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </header>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
});

const mapDispatchToProps = dispatch => ({
  logIn: () => dispatch(logIn())
});

const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent);

export default Header;

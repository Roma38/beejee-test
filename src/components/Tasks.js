import React, { Component } from "react";
import { connect } from "react-redux";
import { API_HOST, DEVELOPER_NAME } from "../config";
import {
  Button,
  CardGroup,
  Card,
  Pagination,
  Modal,
  Form
} from "react-bootstrap";
import axios from "axios";
import {
  tasksLoadStart,
  tasksLoadSucceed,
  tasksLoadFailed
} from "../redux/actions/tasks";
import { createSignature } from "../utils/createSignature";

class TasksComponent extends Component {
  state = {
    sorting: {
      sort_field: "id",
      sort_direction: "asc",
      page: 1
    },
    isModalOpen: false,
    modalData: {},
    editedStatus: null,
    editedText: ""
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ sorting: { ...this.state.sorting, [name]: value } }, () => {
      this.loadData();
    });
  };

  handleDirectionChange = () => {
    this.setState(
      {
        sorting: {
          ...this.state.sorting,
          sort_direction:
            this.state.sorting.sort_direction === "asc" ? "desc" : "asc"
        }
      },
      () => {
        this.loadData();
      }
    );
  };

  handlePageChange = (e, page) => {
    this.setState(
      {
        sorting: { ...this.state.sorting, page }
      },
      () => {
        this.loadData();
      }
    );
  };

  handleEditSubmit = (e, id) => {
    const { editedStatus: status, editedText: text } = this.state;
    const bodyFormData = new FormData();
    const data = { token: "beejee" };

    bodyFormData.set("token", data.token);

    if (text) {
      bodyFormData.set("text", text);
      data.text = text;
    }

    if (status || status === 0) {
      bodyFormData.set("status", status);
      data.status = status;
    }

    bodyFormData.set("signature", createSignature(data));
    axios
      .post(`${API_HOST}//edit/${id}/?${DEVELOPER_NAME}`, bodyFormData)
      .then(({ data }) => {
        this.setState({
          isModalOpen: false,
          editedStatus: null,
          editedText: ""
        });
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  loadData = () => {
    const { sort_field, sort_direction, page } = this.state.sorting;
    this.props.tasksLoadStart();
    axios
      .get(
        `${API_HOST}/?${DEVELOPER_NAME}&sort_field=${sort_field}&sort_direction=${sort_direction}&page=${page}`
      )
      .then(({ data }) => {
        this.props.tasksLoadSucceed(data.message);
      })
      .catch(error => {
        console.error(error);
        this.props.tasksLoadFailed();
        alert("Oops... something went wrong :(");
      });
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { sort_field, sort_direction, page } = this.state.sorting;
    const { items: tasks, itemsCount: tasksCount } = this.props.tasks;
    const { loggedIn } = this.props.auth;
    return (
      <section className="tasks-section">
        <label htmlFor="sortBy">Sort by: </label>
        <select
          value={sort_field}
          name="sort_field"
          onChange={this.handleChange}
          id="sortBy"
          className="sort-select"
        >
          <option value="id">id</option>
          <option value="username">user name</option>
          <option value="email">email</option>
          <option value="status">status</option>
        </select>

        <Button onClick={this.handleDirectionChange}>{sort_direction}</Button>
        <CardGroup>
          {tasks.map(({ id, username, email, status, text }) => (
            <Card key={id} bg={status ? "success" : "secondary"} text="white">
              <Card.Body>
                <Card.Title>{username}</Card.Title>
                <Card.Text>{text}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <p>
                  <small>{email}</small>
                </p>
                {loggedIn ? (
                  <Button
                    onClick={() =>
                      this.setState({
                        isModalOpen: true,
                        modalData: { text, status, id }
                      })
                    }
                  >
                    EDIT
                  </Button>
                ) : null}
              </Card.Footer>
              <Modal
                show={this.state.modalData.id === id}
                onHide={() =>
                  this.setState({
                    isModalOpen: false,
                    editedStatus: null,
                    editedText: ""
                  })
                }
              >
                <Modal.Header closeButton>
                  <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Edit task</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={
                          this.state.editedText || this.state.modalData.text
                        }
                        onChange={e =>
                          this.setState({ editedText: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicChecbox">
                      <Form.Check
                        type="checkbox"
                        label="Done"
                        checked={
                          this.state.editedStatus || this.state.modalData.status
                            ? true
                            : false
                        }
                        onChange={e =>
                          this.setState({
                            editedStatus: e.target.checked ? 10 : 0
                          })
                        }
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      this.setState({
                        isModalOpen: false,
                        editedStatus: null,
                        editedText: ""
                      })
                    }
                  >
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={e =>
                      this.handleEditSubmit(e, this.state.modalData.id)
                    }
                  >
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            </Card>
          ))}
        </CardGroup>

        {tasksCount > 3 ? (
          <Pagination className="pagination">
            {Array(Math.ceil(tasksCount / 3))
              .fill(null)
              .map((item, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === page}
                  onClick={e => this.handlePageChange(e, index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
          </Pagination>
        ) : null}
      </section>
    );
  }
}

const mapStateToProps = ({ auth, tasks }) => ({
  auth,
  tasks
});

const mapDispatchToProps = dispatch => ({
  tasksLoadStart: () => dispatch(tasksLoadStart()),
  tasksLoadSucceed: tasks => dispatch(tasksLoadSucceed(tasks)),
  tasksLoadFailed: () => dispatch(tasksLoadFailed())
});

const Tasks = connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksComponent);

export default Tasks;

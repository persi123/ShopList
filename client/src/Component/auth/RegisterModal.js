import React, { Component } from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  NavLink,
  Input,
  Alert
} from "reactstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authAction";
import { clearErrors } from "../../actions/errorAction";


class RegisterModal extends Component {
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    //is authenticated close model
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggel();
      }
    }
  }

  toggel = () => {
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const { name, email, password } = this.state;

    //create user object

    const newUser = {
      name,
      email,
      password
    };

    //attempt to register
    this.props.register(newUser);
    console.log(newUser);
    // this.props.addItem(newItem);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggel} href="#">
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggel}>
          <ModalHeader toggle={this.toggel}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={this.onChange}
                  className="mb-3"
                ></Input>

                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={this.onChange}
                  className="mb-3"
                />

                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  };
};
export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
);

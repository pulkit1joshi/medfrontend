import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Form from "react-bootstrap/Form";


const REACT_APP_base_url = "https://evening-anchorage-15734.herokuapp.com"

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      username: "",
      show_input: false,
      isLogged: false,
      isRegistered: false,
      errorText: ""
    };
    const token = sessionStorage.getItem("medtoken");
    if (token != null) {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "auth-token": token,
      };
      axios
        .get("https://evening-anchorage-15734.herokuapp.com/api/p/profile", {
          headers: headers,
        })
        .then((response) => {
          this.setState({ isLogged: true });
        });
    }
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  async handleSubmit(e) {
    e.preventDefault();



    const data = JSON.stringify({
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    });

    const headers = {
      "Content-Type": "application/json",
    };

    await axios
      .post(
        REACT_APP_base_url+"/api/user/register",
        data,
        {
          headers: headers,
        }
      )

      .then((response) => {
        if(response.data.error)
        {
            this.setState({ errorText: response.data.msg});
        }
        else
        {
        this.setState({ isRegistered: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (!this.state.isRegistered && !this.state.isLogged) {
      return (
        <div>
        <Form.Text className="text-muted">{this.state.errorText}</Form.Text>
          <Form onSubmit={this.handleSubmit}>
            {" "}
            <Form.Text className="text-muted">{this.state.errortext}</Form.Text>
            <h2>Register </h2> <br />
            <Form.Label>First Name: </Form.Label> <br />
            <Form.Control
              type="text"
              name="firstname"
              onChange={this.onChange}
              value={this.state.firstname}
            />{" "}
            <br />
            <Form.Label>Last Name: </Form.Label> <br />
            <Form.Control
              type="text"
              name="lastname"
              onChange={this.onChange}
              value={this.state.lastname}
            />{" "}
            <br />
            <Form.Label>User Name: </Form.Label> <br />
            <Form.Control
              type="text"
              name="username"
              onChange={this.onChange}
              value={this.state.username}
            />{" "}
            <br />
            <Form.Label>Email: </Form.Label> <br />
            <Form.Control
              type="text"
              name="email"
              onChange={this.onChange}
              value={this.state.email}
            />
            <br />
            <Form.Label>Password: </Form.Label> <br />
            <Form.Control
              type={this.state.show_input ? "text" : "password"}
              name="password"
              onChange={this.onChange}
              value={this.state.password}
            />
            <br />
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      );
    } else {
      return <div>Registered user</div>;
    }
  }
}

export default Register;

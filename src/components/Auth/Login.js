import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { updateUser } from '../../actions/userAction'
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      show_input: false,
      isLogged: false,
      errortext: "",
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = JSON.stringify({
      email: this.state.email,
      password: this.state.password,
    });

    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(
        process.env.REACT_APP_base_url+"/api/user/login",
        data,
        {
          headers: headers,
        }
      )

      .then((response) => {

        if(response.data.error)
        {
          this.setState({ errortext: response.data.msg });
        }
        else
        {
          sessionStorage.setItem("medtoken", response.data.msg.token);
          this.props.updateUser({isLogged: true, userName: "Someone"});
          this.setState({
            isLogged: true,
          });
      }
      });
  }

  render() {
    if (!this.props.isLogged) {
      return (
        <Form onSubmit={this.handleSubmit}>
          {" "}
          <Form.Text className="text-muted">{this.state.errortext}</Form.Text>
          <h1>Login </h1> <br />
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
      );
    } else {
      return <div>Logged In Already</div>;
    }
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.user.isLogged,
  userName: state.user.userName,
});

export default connect(mapStateToProps, { updateUser })(Login);

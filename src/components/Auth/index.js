import React, { Component } from "react";
import Login from "./Login";
import { Switch, Route } from "react-router-dom";
import Register from "./Register";
import Col from "react-bootstrap/Col";
export default class Auth extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/auth/login">
          <Col>
            <Login />
            </Col>
          </Route>
          <Route path="/auth/register">
          <Col>
            <Register /></Col>
          </Route>
        </Switch>
      </React.Fragment>
    );
  }
}

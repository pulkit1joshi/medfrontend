import React, { Component } from "react";
import Profile from "./profile";
import { Switch, Route } from "react-router-dom";
export default class Auth extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/user/profile">
            <Profile />
          </Route>
          <Route path="/user/articles">
            
          </Route>
        </Switch>
      </React.Fragment>
    );
  }
}

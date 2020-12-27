import React, { Component } from "react";
import Profile from "./profile";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./dashboard";
export default class Auth extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
        <Route path="/medfrontend/user/profile/:id" component={Dashboard}></Route>
          <Route path="/medfrontend/user/settings">
            <Profile />
          </Route>
          <Route path="/medfrontend/user/articles">
            
          </Route>
        </Switch>
      </React.Fragment>
    );
  }
}

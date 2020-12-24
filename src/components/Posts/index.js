import React, { Component } from "react";
import Editor from "./submit";
import Article from "./Article"
import { Route, Switch } from "react-router-dom";

export default class Posts extends Component {
  render() {
    return (
      <React.Fragment>
       
       <Switch>
          <Route path="/medfrontend/post/new">
             <Editor />
          </Route>
          <Route path="/medfrontend/post/:id" component={Article}>
          </Route>
          </Switch>
        
      </React.Fragment>
    );
  }
}

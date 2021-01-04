import Auth from "./components/Auth";
import Navig from "./components/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Row from "react-bootstrap/Row";
import store from "./store";
import { Provider } from "react-redux";
import User from "./components/User";
import Main from "./components/Main";
import Posts from "./components/Posts";
import { Grid } from "@material-ui/core";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navig />
          <Switch>
            <Route path="/medfrontend/auth">
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                {" "}
                <Auth />
              </Grid>
            </Route>
            <Route path="/medfrontend/user">
              <Row className="justify-content-md-center">
                <User />
              </Row>
            </Route>
            <Route path="/medfrontend/post">
              <Posts />
            </Route>
            <Route exact path="/medfrontend/">
              <Main />
            </Route>
          </Switch>
        
      </Router>
    </Provider>
  );
}

export default App;

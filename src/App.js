import Auth from "./components/Auth"
import Navig from "./components/Nav";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import store from "./store";
import { Provider } from "react-redux";
import User from "./components/User";
import Main from "./components/Main";
import Posts from "./components/Posts";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navig />
        <Container>
            <Switch>
              <Route path="/medfrontend/auth">
              <Row className="justify-content-md-center">
                <Auth />
                </Row>
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
                <Main/>
            </Route>
            </Switch>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;

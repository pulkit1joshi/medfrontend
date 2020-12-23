import Auth from "./components/Auth"
import Navig from "./components/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
            <Route exact path="/">
                <Main/>
            </Route>
              <Route path="/auth">
              <Row className="justify-content-md-center">
                <Auth />
                </Row>
              </Route>
              <Route path="/user">
              <Row className="justify-content-md-center">
                <User />
                </Row>
              </Route>
              
              <Route path="/post">
                <Posts />
              </Route>
            </Switch>
          
        </Container>
      </Router>
    </Provider>
  );
}

export default App;

import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
//import Navbar from "react-bootstrap/Navbar";
import { updateUser, logoutUser } from "../actions/userAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

//import { Col } from "react-bootstrap";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogActions,
  TextField,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

/*const body = {
  fontFamily: "charter, Georgia, Cambria, 'Times New Roman', Times, serif",
  color: "black"
};*/

const body = {
  fontFamily: "charter, Georgia, Cambria, 'Times New Roman', Times, serif",
  textTransform: "capitalize"
}
const height = 44;
const REACT_APP_base_url = "https://evening-anchorage-15734.herokuapp.com";
class Navig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: this.props.isLogged,
      userName: "",
      imageUrl: "",
      open: false,
      openreg: false,
      email: "",
      password: "",
      errortext: "",
      firstname: "",
      lastname: "",
      username: "",
      isRegistered: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.props.updateUser();
    this.logout = this.logout.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleCloseReg = this.handleCloseReg.bind(this);
    this.handleOpenReg = this.handleOpenReg.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    console.log("Changing");
    const target = e.target;
    const value = target.value;
    const name = target.name;
    console.log(name);
    console.log(value);
    this.setState({ [name]: value });
  }

  async handleSubmit() {
    console.log("YOYO");
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
      .post(REACT_APP_base_url + "/api/user/register", data, {
        headers: headers,
      })

      .then((response) => {
        if (response.data.error) {
          this.setState({ errortext: response.data.msg });
          console.log(response.data.error);
        } else {
          this.setState({ isRegistered: true });
          this.handleCloseReg();
          this.handleOpen();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSubmitLogin() {
    const data = JSON.stringify({
      email: this.state.email,
      password: this.state.password,
    });

    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(REACT_APP_base_url + "/api/user/login", data, {
        headers: headers,
      })

      .then((response) => {
        if (response.data.error) {
          this.setState({ errortext: response.data.msg });
          console.log(response.data.error);
        } else {
          sessionStorage.setItem("medtoken", response.data.msg.token);
          this.props.updateUser({ isLogged: true, userName: "Someone" });
          this.setState({
            isLogged: true,
            
          });
          this.handleClose();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    
  }

  handleCloseReg() {
    console.log("YOYO");
    this.setState({
      openreg: false,
    });
    console.log(this.state.open);
  }

  handleOpenReg() {
    this.setState({
      openreg: true,
    });
  }

  handleClose() {
    console.log("YOYO");
    this.setState({
      open: false,
    });
    console.log(this.state.open);
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  logout() {
    console.log("Logout try");
    this.props.logoutUser();
    this.setState({
      isLogged: false,
      userName: "",
    });
  }

  render() {
    if (!this.props.isLogged) {
      return (
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            aria-describedby="simple-modal-description"
            fullWidth={true}
          >
            <DialogTitle id="form-dialog-title" style={{ paddingBottom: 0 }}>
              <p style={{ fontSize: "3em",fontFamily: "charter, Georgia, Cambria, 'Times New Roman', Times, serif", }}>Sign in</p>
            </DialogTitle>
            <DialogContent>
              <p style={{ fontSize: "10px", color: "red" }}>
                {this.state.errortext}
              </p>
              <TextField
                name="email"
                defaultValue="Email"
                value={this.state.email}
                onChange={this.onChange}
                fullWidth
                label="Email"
                size="big"
                inputProps={{
                  style: {
                    height,
                    fontSize: 15,
                  },
                }}
              />
              <br />
              <TextField
                name="password"
                defaultValue="Password"
                label="Password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
                size="large"
                fullWidth
                inputProps={{
                  style: {
                    height,
                    fontSize: 15,
                  },
                }}
              />
            </DialogContent>

            <DialogActions>
              <Button
                onClick={this.handleClose}
                style={{ fontSize: 17 }}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                onClick={this.handleSubmitLogin}
                style={{ fontSize: 17 }}
                color="primary"
              >
                Sign in
              </Button>
            </DialogActions>
          </Dialog>


          <Dialog
            open={this.state.openreg}
            onClose={this.handleCloseReg}
            aria-labelledby="form-dialog-title"
            aria-describedby="simple-modal-description"
            fullWidth={true}
          >
            <DialogTitle id="form-dialog-title" style={{ paddingBottom: 0 }}>
              <p style={{ fontSize: "3em", fontFamily: "charter, Georgia, Cambria, 'Times New Roman', Times, serif"  }}>Sign Up</p>
            </DialogTitle>
            <DialogContent>
              <p style={{ fontSize: "10px", color: "red" }}>
                {this.state.errortext}
              </p>
              <TextField
                name="firstname"
                defaultValue="First Name"
                fullWidth
                value={this.state.firstname}
                onChange={this.onChange}
                label="First Name"
                
                inputProps={{
                  style: {
                    height,
                    fontSize: 15,
                  },
                }}
              />

              <TextField
                name="lastname"
                defaultValue="Last Name"
                fullWidth
                value={this.state.lastname}
                onChange={this.onChange}
                label="Last Name"
                inputProps={{
                  style: {
                    height,
                    fontSize: 15,
                  },
                }}
              />
              <TextField
                name="username"
                defaultValue="User Name"
                fullWidth
                value={this.state.username}
                onChange={this.onChange}
                label="User Name"
                inputProps={{
                  style: {
                    height,
                    fontSize: 15,
                  },
                }}
              />
              <br/>
              <TextField
                name="email"
                defaultValue="Email"
                value={this.state.email}
                onChange={this.onChange}
                fullWidth
                label="Email"
                size="big"
                inputProps={{
                  style: {
                    height,
                    fontSize: 15,
                  },
                }}
              />
              <br />
              <TextField
                name="password"
                defaultValue="Password"
                label="Password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
                size="large"
                fullWidth
                inputProps={{
                  style: {
                    height,
                    fontSize: 15,
                  },
                }}
              />
            </DialogContent>

            <DialogActions>
              <Button
                onClick={this.handleCloseReg}
                style={{ fontSize: 17 }}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                onClick={this.handleSubmit}
                style={{ fontSize: 17 }}
                color="primary"
              >
                Sign Up
              </Button>
            </DialogActions>
          </Dialog>





          
          <AppBar
            position="static"
            style={{
              backgroundColor: "rgba(255, 192, 23, 0.1)",
              marginBottom: "0em",
              boxShadow: "none",
              
            }}
          >
            <Grid
              container
              xs={12}
              md={12}
              lg={12}
              style={{
                position: "fixed",
                display: "block",
                zIndex: "100",
                paddingTop: "0.5em",
                paddingBottom: "0.5em",
                borderBottom: "1px solid black",
                backgroundColor: "rgba(255, 192, 23, 0.5)",
                
              }}
            >
              <Toolbar
                style={{
                  flexGrow: 1,
                  borderColor: "black",
                }}
              >
                <Grid item xs={2} md={2} lg={2}></Grid>
                <Grid item xs={2} md={2} lg={2}>
                  {" "}
                  <Typography variant="h3" style={{ color: "black" }}>
                    <Link
                      exact
                      to="/medfrontend/"
                      style={{ fontWeight: "bold", color: "black" }}
                    >
                      MedBook
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={5} md={5} lg={5}></Grid>
                <Grid item className="d-none d-lg-block">
                  <Button color="inherit" onClick={this.handleOpen} style={body}>
                    <Link
                      exact
                      //to="/medfrontend/auth/login"
                      style={{ fontSize: "2em", color: "black" }}
                    >
                      Sign in
                    </Link>
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="inherit" onClick={this.handleOpenReg} style={body}>
                    <Link
                      exact
                      //to="/medfrontend/auth/register"
                      style={{ fontSize: "2em", color: "black" }}
                    >
                      Sign up
                    </Link>
                  </Button>
                </Grid>
                <Grid item xs={1} md={1} lg={1}></Grid>
                <hr />
              </Toolbar>
            </Grid>
          </AppBar>
        </div>
      );
    } else {
      return (
        <div>
          <AppBar
            position="static"
            style={{
              backgroundColor: "#FFFF",
              boxShadow: "none",
            }}
          >
            <Grid
              container
              xs={12}
              md={12}
              lg={12}
              style={{
                position: "fixed",
                backgroundColor: "inherit",
                display: "block",
                zIndex: "100",
                paddingTop: "0.5em",
                paddingBottom: "0.5em",
                borderBottom: "1px solid black"
              }}
            >
              <Toolbar
                style={{
                  flexGrow: 1,
                }}
              >
                <Grid item xs={2} md={2} lg={2}></Grid>
                <Grid item xs={2} md={2} lg={2}>
                  {" "}
                  <Typography variant="h3" style={{ color: "black" }}>
                    <Link
                      exact
                      to="/medfrontend/"
                      style={{ fontWeight: "bold", color: "black" }}
                    >
                      MedBook
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={4} md={4} lg={4}></Grid>
                <Nav className="ml-auto">
                  {/*<Nav.Item className="ml-auto" bsPrefix="nav-link">
              
            </Nav.Item>*/}
                  <NavDropdown
                    title={
                      <img
                        src={this.props.imageUrl}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                        alt="Your profile pic"
                      ></img>
                    }
                    alignRight={true}
                    id="dropdown-menu-align-right"
                    flip
                  >
                    <NavDropdown.Item>
                      <Link
                        to={"/medfrontend/user/profile/" + this.props.userId}
                      >
                        Welcome {this.props.userName}
                      </Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/medfrontend/user/settings">Settings</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/medfrontend/post/new">New Post</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link onClick={this.logout}>Logout</Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <hr />
              </Toolbar>
            </Grid>
          </AppBar>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.user.isLogged,
  userName: state.user.userName,
  imageUrl: state.user.imageUrl,
  userId: state.user.userId,
});

export default connect(mapStateToProps, { updateUser, logoutUser })(Navig);

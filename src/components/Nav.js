import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { updateUser, logoutUser } from "../actions/userAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

const option = {
  color: "black",
  padding: "0.45em",
};

class Navig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: this.props.isLogged,
      userName: "",
      imageUrl: "",
    };
    this.props.updateUser();
    this.logout = this.logout.bind(this);
  }



  logout()
  {
    console.log("Logout try");
    this.props.logoutUser();
    this.setState({
      isLogged: false,
      userName: ""
    })
  }

  render() {
    if (!this.props.isLogged) {
      return (
        <Navbar expand="lg" bg="light" variant="light">
          <Navbar.Brand>
            <Link to="/" style={{ color: "black" }}>
              Med-book
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Nav className="ml-auto">
            <Nav.Item className="ml-auto" bsPrefix="nav-link">
              <Link exact to="/auth/login" style={option}>
                Login
              </Link>
            </Nav.Item>
            <Nav.Item className="ml-auto" bsPrefix="nav-link">
              <Link exact to="/auth/register" style={option}>
                Register
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar>
      );
    } else {
      return (
        <Navbar bg="light" variant="light">
          <Navbar.Brand>
            <Link to="/" style={{ color: "black" }}>
              Med-book
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Nav className="ml-auto">
            {/*<Nav.Item className="ml-auto" bsPrefix="nav-link">
              
            </Nav.Item>*/}
            <NavDropdown
              title={
                <img
                  src={this.props.imageUrl}
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                  alt="Your profile pic"
                ></img>
              }
              alignRight={true}
              id="dropdown-menu-align-right"
              flip
            >
              <NavDropdown.Item>
                <Link to={"/user/profile/"+this.props.userId} style={option}>
                  Welcome {this.props.userName}
                </Link>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <Link to="/user/settings" style={option}>
                  Settings
                </Link>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <Link to="/post/new" style={option}>
                  New Post
                </Link>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <Link onClick={this.logout} style={option}>
                  Logout
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.user.isLogged,
  userName: state.user.userName,
  imageUrl: state.user.imageUrl,
  userId: state.user.userId
});

export default connect(mapStateToProps, { updateUser, logoutUser })(Navig);

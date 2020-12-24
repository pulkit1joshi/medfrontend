import React, { Component } from "react";
//import Button from 'react-bootstrap/Button';
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Image from "react-bootstrap/Image";
import "./profile.css";

const REACT_APP_base_url = "https://evening-anchorage-15734.herokuapp.com";

const style1 = {
  borderTopWidth: "0em",
  borderRightWidth: "0em",
  borderLeftWidth: "0em",
  boxShadow: "none",
  borderRadius: "1px",
  padding: "0.1em",
  backgroundColor: "white",
};

const head = {
  padding: "1.0em",
  fontSize: "40px",
  fontWeight: "bold",
  fontFamily:
    "font-family: sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const head2 = {
  color: "gray",
  fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: "17px",
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      password2: "",
      password3: "",
      togglepassword: true,
      togglebio: true,
      toggleimg: true,
      toggleusername: true,
      toggleemail: true,
      togglename: true,
      show_input: false,
      isLogged: false,
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      name: "",
      bio: "",
      gender: "",
      interests: "",
      followers: "",
      posts: "",
      publications: "",
      img: "",
      errortext: "",
      passtext: "",
      succtext: "",
    };
    this.getData();
  }

  async getData() {
    const headers = {
      Accept: "application/json",
    };
    await axios
      .get(
        "https://evening-anchorage-15734.herokuapp.com/api/p/profile/" +
          this.props.match.params.id,
        {
          headers: headers,
        }
      )
      .then((response) => {
        if(response.data.error)
        {
          return this.setState({errortext: response.data.error.msg});
        }
        const prof = response.data.user;
        console.log(response.data);
        let gender = "male";
        if (prof.gender === 1) gender = 1;
        else gender = 2;
        this.setState({
          password3: response.data.user2.password,
          firstname: response.data.user2.firstname,
          lastname: response.data.user2.lastname,
          username: response.data.user2.username,
          email: response.data.user2.email,
          bio: prof.about,
          gender: gender,
          interests: prof.interests,
          followers: prof.followerids,
          posts: prof.postids,
          publications: prof.publicationids,
          img: prof.image,
          errortext: "",
          followerscount: response.data.user.followerids.length,
        });
      });
  }

  render() {
    return (
      <React.Fragment>
          <Row className="d-lg-block">
            <Row style={head} className="justify-content-md-center headt" fluid>
              {this.state.firstname} {this.state.lastname}
            </Row>
            <Row style={head2} className="justify-content-md-center headt" fluid>
              {this.state.followerscount} Followers
            </Row>
            <hr />
        </Row>
        
        <Row>
          <Col xs={1} md={2} lg={2}>
           
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.user.isLogged,
  userName: state.user.userName,
  imageUrl: state.user.imageUrl,
});

export default connect(mapStateToProps)(Dashboard);

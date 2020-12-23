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
import Image from "react-bootstrap/Image"
import "./profile.css"

const style1 = {
  borderTopWidth: "0em",
  borderRightWidth: "0em",
  borderLeftWidth: "0em",
  boxShadow: "none",
  borderRadius: "1px",
  padding: "0.1em",
  backgroundColor: "white",
};

class Profile extends Component {
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
      succtext: ""
    };
    const token = sessionStorage.getItem("medtoken");
    if (token != null) {
      const headers = {
        Accept: "application/json",
        "auth-token": token,
      };
      axios
        .get("https://evening-anchorage-15734.herokuapp.com/api/p/profile", {
          headers: headers,
        })
        .then((response) => {
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
          });
        });
    }
    this.onChange = this.onChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async onChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    await this.setState({ [name]: value });
    if (name === "password" || name === "password2") {
      if (this.state.password !== this.state.password2) {
        console.log(this.state.password);
        console.log(this.state.password2);
        this.setState({ passtext: "Passwords do not match." });
      } else if (this.state.password.length < 8) {
        this.setState({ passtext: "Password length must more then 8" });
      } else 
      {
        this.setState({ password3: value });
        this.setState({ passtext: "" });
      }
    }
    
  }

  async handleSubmit(e) {
    e.preventDefault();
    console.log("Submit clicked");
    /*
    {userid : req.user._id},
            {
                "userid": req.user._id,
                "about": req.body.about,
                "image": req.body.image,
                "gender": req.body.gender,
                "country": req.body.country,
                "interests": req.body.interests
            }
            );
        
        await User.update(
                {__id : req.user._id},
                {
                    "email": req.body.email,
                    "password": req.body.password,
                    "username": req.body.username,
                }
                );
                */
    if (this.state.firstname.length === 0) {
      this.setState({ errortext: "First name can not be empty", succtext: "" });
      return;
    } else if (this.state.lastname.length === 0) {
      this.setState({ errortext: "Last name can not be empty", succtext: "" });
      return;
    } else if (this.state.username.length === 0) {
      this.setState({ errortext: "User name can not be empty", succtext: ""});
      return;
    } else if (this.state.email.length === 0) {
      this.setState({ errortext: "Email name can not be empty", succtext: "" });
      return;
    }

    const data = JSON.stringify({
      email: this.state.email,
      password: this.state.password3,
      username: this.state.username,
      lastname: this.state.lastname,
      firstname: this.state.firstname,
      about: this.state.bio,
      image: this.state.img,
      gender: this.state.gender,
      country: 1,
      interests: [],
    });
    const token = sessionStorage.getItem("medtoken");
    const headers = {
      "Content-Type": "application/json",
      "auth-token": token,
    };

    await axios
      .post(
        process.env.REACT_APP_base_url+"/api/p/profile",
        data,
        {
          headers: headers,
        }
      )

      .then((response) => {
        if (response.data.error) {
          console.log(response);
          //this.setState({ errortext: response.data.msg });
        } else {
          console.log(response);
          this.setState({ succtext: "Updated", errortext: "" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if(this.props.isLogged)
    {
    return (
      <Container fluid>
        <Row>
          <Col
            xs={12}
            md={12}
            lg={3}
            className="d-none d-lg-block"
            style={{ backgroundColor: "white", margin: "0em" }}
          >
         
            <div style={{ position: "fixed" }}>
              <Row style={{ margin: "0.6em", marginTop: "-5%" }}>
              <Form.Text style={{ backgroundColor: "white", color: "red", position: "fixed" }} className="text-center" fluid>
                {this.state.errortext}
              </Form.Text>
            </Row>
            <Row style={{ margin: "0.6em", marginTop: "-5%" }}>
              <Form.Text style={{ backgroundColor: "white", color: "green", position: "fixed" }} className="text-center" fluid>
                {this.state.succtext}
              </Form.Text>
            </Row>
            <hr />
              <Row style={{ margin: "0.6em", marginTop: "0em" }}>
                <h3>
                  <b>Settings</b>
                </h3>
              </Row>
              <Row style={{ margin: "0.7em", color: "gray" }}>
                <h4>
                  <b>Profile</b>
                </h4>
              </Row>
              <Row style={{ margin: "0.7em", color: "gray" }}>
                <h4>
                  <b>Email Settings</b>
                </h4>
              </Row>
              <Row style={{ margin: "0.7em", color: "gray" }}>
                <h4>
                  <b>Account</b>
                </h4>
              </Row>
              <Row style={{ margin: "0.7em", color: "gray" }}>
                <h4>
                  <b>Security</b>
                </h4>
              </Row>
              <Row style={{ margin: "0.7em", color: "gray" }}>
                <h4>
                  <b></b>
                </h4>
              </Row>
              <Row style={{ margin: "0.7em", color: "gray" }}>
                <h4>
                  <b></b>
                </h4>
              </Row>
              <Row style={{ margin: "0.7em", color: "gray" }}>
                <h4>
                  <b></b>
                </h4>
              </Row>
              <hr style={{ border: "1em", backgroundColor: "black" }}></hr>
            </div>
          </Col>
          <Col style={{ backgroundColor: "white" }}>
            
            <h3>
              <b>Profile</b>
            </h3>
            <hr />
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col xs={8}>
                  <h4>
                    <b>Name</b>
                  </h4>
                  <Row>
                    <Col xs={6}>
                      <Form.Control
                        type="name"
                        name="firstname"
                        onChange={this.onChange}
                        value={this.state.firstname}
                        readOnly={this.state.togglename}
                        style={style1}
                      />
                    </Col>

                    <Col xs={4}>
                      <Form.Control
                        type="name"
                        name="lastname"
                        value={this.state.lastname}
                        onChange={this.onChange}
                        readOnly={this.state.togglename}
                        style={style1}
                      />
                    </Col>
                  </Row>
                  <Form.Text
                    className="text-muted"
                    style={{ marginTop: "2em", fontWeight: "8px" }}
                  >
                    Your name appears on your Profile page, as your byline, and
                    in your responses. It is a required field.
                  </Form.Text>
                </Col>
                <Col xs={2}></Col>
                <Col xs={2}>
                  <Button
                    variant="outline-dark"
                    style={{ borderWidth: "1px" }}
                    onClick={() => {
                      this.setState({ togglename: !this.state.togglename });
                    }}
                  >
                    Edit
                  </Button>
                </Col>
              </Row>

              <Row style={{ marginTop: "6em" }}>
                <Col xs={8}>
                  <h4>
                    <b>Bio</b>
                  </h4>
                  <Form.Control
                    type="Bio"
                    onChange={this.onChange}
                    name="bio"
                    readOnly={this.state.togglebio}
                    value={this.state.bio}
                    style={style1}
                  />
                  <Form.Text
                    className="text-muted"
                    style={{ marginTop: "2em", fontWeight: "8px" }}
                  >
                    Your bio appears on your Profile page. Max 160 characters.
                  </Form.Text>
                </Col>
                <Col xs={2}></Col>
                <Col xs={2}>
                  <Button
                    variant="outline-dark"
                    style={{ borderWidth: "1px" }}
                    onClick={() => {
                      this.setState({ togglebio: !this.state.togglebio });
                    }}
                  >
                    Edit
                  </Button>
                </Col>
              </Row>

              <Row style={{ marginTop: "6em" }}>
                <Col xs={6}>
                  <h4>
                    <b>Photo</b>
                  </h4>
                  <Form.Control
                    type="text"
                    name="img"
                    value={this.state.img}
                    onChange={this.onChange}
                    style={style1}

                    readOnly={this.state.toggleimg}
                  />
                  <Form.Text
                    className="text-muted"
                    style={{ marginTop: "2em", fontWeight: "8px" }}
                  >
                    Your photo appears on your Profile page and with your
                    stories across Medium.
                    <br></br>
                    Recommended size: Square, at least 1000 pixels per side.
                    File type: JPG, PNG or GIF
                  </Form.Text>
                </Col>
                <Col xs={4}>
                  <Col xs={8}>
                    <br />
                    <Image src={this.state.img} style={{width: "80px", height:"80px", borderRadius: "50%"}}></Image>
                  </Col>
                </Col>
                <Col xs={2}>
                  <Button
                    variant="outline-dark"
                    style={{ borderWidth: "1px" }}
                    onClick={() => {
                      this.setState({ toggleimg: !this.state.toggleimg });
                    }}
                  >
                    Edit
                  </Button>
                </Col>
              </Row>

              <Row style={{ marginTop: "6em" }}>
                <Col xs={8}>
                  <h4>
                    <b>Username</b>
                  </h4>
                  <Form.Control
                    type="Bio"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                    style={style1}
                    readOnly={this.state.toggleusername}
                  />
                  <Form.Text
                    className="text-muted"
                    style={{ marginTop: "2em", fontWeight: "8px" }}
                  >
                    Your Profile will be available at this address.
                  </Form.Text>
                </Col>
                <Col xs={2}></Col>
                <Col xs={2}>
                  <Button
                    variant="outline-dark"
                    style={{ borderWidth: "1px" }}
                    onClick={() => {
                      this.setState({
                        toggleusername: !this.state.toggleusername,
                      });
                    }}
                  >
                    Edit
                  </Button>
                </Col>
              </Row>
              <Row style={{ marginTop: "3em", marginLeft: "0.00em" }}>
                <h3>
                  <b>Email Settings</b>
                </h3>
              </Row>
              <hr />

              <Row style={{ marginTop: "3em" }}>
                <Col xs={8}>
                  <h4>
                    <b>Email</b>
                  </h4>
                  <Form.Control
                    type="Bio"
                    value={this.state.email}
                    name="email"
                    onChange={this.onChange}
                    style={style1}
                    readOnly={this.state.toggleemail}
                  />
                  <Form.Text
                    className="text-muted"
                    style={{ marginTop: "2em", fontWeight: "8px" }}
                  >
                    This is your main email that will be used for notifying you.
                  </Form.Text>
                </Col>
                <Col xs={2}></Col>
                <Col xs={2}>
                  <Button
                    variant="outline-dark"
                    style={{ borderWidth: "1px" }}
                    onClick={() => {
                      this.setState({ toggleemail: !this.state.toggleemail });
                    }}
                  >
                    Edit
                  </Button>
                </Col>
              </Row>

              <Row style={{ marginTop: "3em", marginLeft: "0.00em" }}>
                <h3>
                  <b>Account</b>
                </h3>
              </Row>
              <hr />

              <Row style={{ marginTop: "3em" }}>
                <Col xs={8}>
                  <h4>
                    <b>Followers</b>
                  </h4>
                  {this.state.followers.length}
                  <Form.Text
                    className="text-muted"
                    style={{ marginTop: "2em", fontWeight: "8px" }}
                  >
                    Your followers love your posts.
                  </Form.Text>
                </Col>
                <Col xs={2}></Col>
                <Col xs={2}>
                  <Button variant="outline-dark" style={{ borderWidth: "1px" }}>
                    Show
                  </Button>
                </Col>
              </Row>

              <Row style={{ marginTop: "3em" }}>
                <Col xs={8}>
                  <h4>
                    <b>Password</b>
                  </h4>
                  <Form.Control
                    type="password"
                    placeholder="password"
                    value={this.state.password}
                    name="password"
                    onChange={this.onChange}
                    style={style1}
                    readOnly={this.state.togglepassword}
                  />
                  <Form.Text
                    className="text-muted"
                    style={{ marginTop: "2em", fontWeight: "8px" }}
                  >
                    Password must be at least of 6 characters <br />
                  </Form.Text>
                  <Form.Text style={{ color: "red" }}>
                    {this.state.passtext}
                  </Form.Text>
                </Col>
                <Col xs={2}></Col>
                <Col xs={2}></Col>

                <Col xs={8}>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={this.state.password2}
                    name="password2"
                    onChange={this.onChange}
                    style={style1}
                    readOnly={this.state.togglepassword}
                  />
                  <Form.Text
                    className="text-muted"
                    style={{ marginTop: "2em", fontWeight: "8px" }}
                  >
                    Make sure that passwords match.
                  </Form.Text>
                </Col>
                <Col xs={2}></Col>
                <Col xs={2}>
                  <Button
                    variant="outline-dark"
                    style={{ borderWidth: "1px" }}
                    onClick={() => {
                      this.setState({
                        togglepassword: !this.state.togglepassword,
                      });
                    }}
                  >
                    Edit
                  </Button>
                </Col>
              </Row>

              <Row style={{ padding: "1em" }}>
                <Button
                  type="submit"
                  variant="outline-success"
                  style={{
                    borderWidth: "1px",
                    marginTop: "1em",
                    marginBottom: "1em",
                  }}
                >
                  Save
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    );
    }
    else return <Redirect to={"/auth/login"}/>
          
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.user.isLogged,
  userName: state.user.userName,
  imageUrl: state.user.imageUrl,
});

export default connect(mapStateToProps)(Profile);


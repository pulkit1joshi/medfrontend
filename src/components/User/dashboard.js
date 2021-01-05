import React, { Component } from "react";
//import Button from 'react-bootstrap/Button';
import axios from "axios";
import { Grid, Box, Divider, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import "./profile.css";
import Card2 from "../Main/bigcard";

import ButtonBase from "@material-ui/core/ButtonBase";

const REACT_APP_base_url = "https://evening-anchorage-15734.herokuapp.com";

const head = {
  paddingTop: "1.0em",
  fontSize: "64px",
  fontWeight: "bold",
  textAlign: "center",
  fontFamily:"font-family: sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const dashPad = {
  paddingTop: "5em"
}

const head2 = {
  marginBottom: "3em",
  color: "gray",
  textAlign: "center",
  fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: "17px",
};

const details = {
  color: "gray",
  fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: "14px",
};

const img = {
  borderRadius:"50%",
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
  height: "130px",
  width: "130px",
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
      posts: [],
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
        if (response.data.error) {
          return this.setState({ errortext: response.data.error.msg });
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
          publications: prof.publicationids,
          img: prof.image,
          errortext: "",
          followerscount: response.data.user.followerids.length,
        });
      });

    await axios
      .get(
        REACT_APP_base_url + "/api/article/user/" + this.props.match.params.id,
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log(response);
        this.setState({ posts: response.data.articles });
      });
  }

  render() {
    return (
      <React.Fragment>
      <Grid container md={7} lg={7} xs={7} style={dashPad}>
        <Grid container direction="row" justify="center" alignItems="center">
          <p style={head}>
            {" "}
            {this.state.firstname} {this.state.lastname}
          </p>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <p style={head2}> {this.state.followerscount} Followers </p>
          
        </Grid>
        <Divider style={{width:"100%"}}/>
        <Grid container justify="space-between">
          <Grid container justify="space-between" lg={1} style={{marginTop: "2em"}}>
          <Box display={{ xs: "none", md: "none", lg: "block" }}>
            <Grid direction="column" style={{ position: "fixed" }} >
              <Grid item style={{ marginBottom: "2em" }} lg={3}>
                <ButtonBase style={img}>
                  <img
                    style={img}
                    alt="Writers profile pic"
                    src={this.state.img}
                  />
                </ButtonBase>
              </Grid>

              <Grid item alignItems="flex-start" lg={3}>
                <p style={details}> ABOUT </p>
              </Grid>
              <Grid item alignItems="flex-start" lg={3}>
                <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                  {" "}
                  {this.state.firstname} {this.state.lastname}
                </p>
              </Grid>
              <Grid item alignItems="flex-start" lg={3}>
                <Typography style={details}> {this.state.bio} </Typography>
              </Grid>
            </Grid>
            </Box>
          </Grid>
        <Grid
          container
          justify="space-between"
          lg={9}
          xs={12}
          md={12}
        >
          {this.state.posts && this.state.posts.map((post) => {
            console.log(post);
            return <Card2 data={post} />;
          })}
        </Grid>
</Grid>
        <hr />
        </Grid>
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

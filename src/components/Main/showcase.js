import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Card from "./card";
import { Grid } from "@material-ui/core"

const REACT_APP_base_url = "https://evening-anchorage-15734.herokuapp.com"

const recents = {
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center"
}

class ShowCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
    this.fetchPosts(0);
  }
  async fetchPosts(pg) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    };
    await axios
      .get(REACT_APP_base_url+"/api/article/list/" + pg, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        this.setState({ posts: response.data.articles });
      });
  }
  componentDidMount() {
    this.fetchPosts();
  }
  render() {
    return (
      <div>
        <Grid style={recents} justify="center" alignItems="center">Recents</Grid>
        <Grid>
          {this.state.posts.map((post) => {
            console.log(post.title);
            return <Card data={post} />;
          })}
          </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.user.isLogged,
  userName: state.user.userName,
});

export default connect(mapStateToProps)(ShowCase);

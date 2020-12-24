import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Tile from "./tile";
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

const REACT_APP_base_url = "https://evening-anchorage-15734.herokuapp.com"

const recents = {
    fontSize: "20px",
    fontWeight: "bold",
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
        <Col xs={1} md={1} lg={2}></Col>
        <Col xs={11} md={11} lg={8} style={{margin: "0em", padding:"0em"}} fluid>
        <Row className="justify-content-md-center" style={recents}>Recents</Row>
          {this.state.posts.map((post) => {
            console.log(post.title);
            return <Tile data={post} />;
          })}
        </Col>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.user.isLogged,
  userName: state.user.userName,
});

export default connect(mapStateToProps)(ShowCase);

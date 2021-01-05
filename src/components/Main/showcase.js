import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Card from "./card";
import { AppBar, Toolbar, Typography, Grid } from "@material-ui/core";

const REACT_APP_base_url = "https://evening-anchorage-15734.herokuapp.com"

const recents = {
    fontSize: "15px",
    fontWeight: "bold",
    marginLeft: "1em"
}

const body = {
  fontFamily: "charter, Georgia, Cambria, 'Times New Roman', Times, serif",
  color: "black"
};

const tags = {
  fontSize: "15px",
    fontWeight: "bold",
  marginLeft: "2em",
  position: "fixed",
}

class ShowCase extends Component {
  constructor(props) {
    super(props);
    let col = "#FFFF";
    if(this.props.isLogged !== true)
      col = "#FFC017";
    this.state = {
      posts: [],
      color: col
    };
    this.fetchPosts(0);
    /*let item = {
      updatedAt: "10/Sep/2020 IST Time",
      _id: "someid",
      title: "Tile of the post",
      description: "Post Description Post Description Post Description Post Description Post Description Post Description Post Description Post Description Post Description Post Description Post Description Post Description Post Description Post Description Post Description",
      imageURL: "someimage.com/jpg"
    };*/
   /* for(let i=0;i<10;i++)
    {
      this.state.posts.push(item);
    }*/
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
    let col = "#FFFF";
    if(this.props.isLogged !== true)
      col = "#FFC017";
    this.setState({color: col})
  }

  static getDerivedStateFromProps(props, state) {
    // Re-run the filter whenever the list array or filter text change.
    // Note we need to store prevPropsList and prevFilterText to detect changes.
    if (
      props.isLogged === true
    ) {
      return {
        posts: state.posts,
        color: "#FFF",
      };
    }
    return {
      posts: state.posts,
      color: "#FFC017",
    };
  }

  render() {
    return (
      <div>
      <AppBar position="static" style={{ backgroundColor: this.state.color, paddingBottom: "3.5em", flexGrow: "1",boxShadow:"none", borderBottom: "1px solid black", paddingTop: "3em", borderTop: "1px solid black" }}>
      <Grid container xs={12} md={12} lg={12}>
            <Toolbar style={{ flexGrow: 1 , paddingTop: "3.5em"}}>
              <Grid item xs={2} md={2} lg={2}></Grid>
              <Grid item xs={3} md={3} lg={3}><Typography variant="h1" style={body}>
              Explore new perspectives
              </Typography><br/>
              <Typography style={{marginTop: "1em", color: "black", fontSize: "20px"}}>Read and share ideas from independent voices, world-class publications, and experts from around the globe. Everyone's welcome.</Typography>
              </Grid>
              <Grid item xs={2} md={2} lg={2}></Grid>
              </Toolbar>
      </Grid>
      </AppBar>
      <Grid container style={{marginTop: "3.5em"}}>
      <Grid item xs={2} md={2} lg={2} ></Grid>
      
        <Grid item xs={10} md={10} lg={5} style={{borderRight: "1px solid lightgray"}}><p style={recents}>RECENT CONTENT ON MEDBOOK</p><br/>
        {this.state.posts.map((post) => {
            console.log(post.title);
            return <Card data={post} />;
          })}
          </Grid>
        <Grid item xs={0} md={0} lg={2} display={{xs: "none", md:"none", lg:"block"}}>
              <p style={tags}>READ WHAT MATTERS TO YOU</p>
          </Grid>
          <Grid item xs={2} md={2} lg={2} ></Grid>
          
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

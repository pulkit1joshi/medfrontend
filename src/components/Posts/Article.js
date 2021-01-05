import React, { Component } from "react";
import parse from "html-react-parser";
import axios from "axios";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import "./image.css";
import { Grid, Box } from "@material-ui/core";

const REACT_APP_base_url = "https://evening-anchorage-15734.herokuapp.com";

const clapicon =
  "https://miro.medium.com/max/2400/1*9M0oeCEgOsovOMz2snw5iw.png";

//const responseicon =
// "https://www.pngfind.com/pngs/m/77-775446_png-file-svg-chat-bubble-icon-png-transparent.png";
const style1 = {
  borderTopWidth: "0em",
  borderRightWidth: "0em",
  borderLeftWidth: "0em",
  boxShadow: "none",
  backgroundColor: "white",
  paddingLeft: "0.15em",
  fontFamily: 'fell, Georgia, Cambria, "Times New Roman", Times, serif',
  fontSize: "3.5em",
  fontStyle: "normal",
};

const articlePad = {
  paddingTop:"7em",
}

const publication = {
  fontSize: "1.2em",
  fontWeight: "bold",
};
const pub_desc = {
  color: "gray",
  paddingRight: "0em",
};
const tag = {
  backgroundColor: "lightgray",
  textAlign: "center",
  color: "gray",
  fontSize: "90%",
  paddingTop: "0.2em",
  paddingBottom: "0.20em",
  borderRadius: "0.2em",
  margin: "1em",
};

const body = {
  fontFamily: "charter, Georgia, Cambria, 'Times New Roman', Times, serif",
  fontSize: "21px",
  lineHeight: "1.5em",
};

const icon = {
  opacity: "20%",
  width: "70px",
};

const date = {
  color: "gray",
};

const style2 = {
  borderTopWidth: "0em",
  borderRightWidth: "0em",
  borderLeftWidth: "0em",
  boxShadow: "none",
  borderRadius: "1px",
  backgroundColor: "white",
  textAlign: "right",
  fontFamily: 'fell, Georgia, Cambria, "Times New Roman", Times, serif',
  fontSize: "20px",
  marginTop: "0.5em",
  marginBottom: "0.5em",
};

class Article extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
      title: "",
      description: "",
      date: "",
      taglist: ["Hello", "Shallow", "Meow", "Sheow"],
      clappable: false,
      claped: false,
    };
    this.getData();
  }

  async getData() {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    };
    await axios
      .get(REACT_APP_base_url + "/api/article/" + this.props.match.params.id, {
        headers: headers,
      })
      .then((response) => {
        console.log("Called");
        console.log(response.data);
        let date = response.data.article.updatedAt;
        date = date.substring(0, 10);
        let pname = "";
        let pdesc = "";
        let pid = "";
        let plink = "";
        if (response.data.publication.exists === false) {
          pname = response.data.writer.firstname;
          pdesc = response.data.prof.about;
          pid = response.data.article.writerid;
          plink = process.env.REACT_APP_profile_url + pid;
        } else {
          pname = response.data.publication.name;
          pdesc = response.data.publication.description;
          pid = response.data.publication.pid;
          plink = "/medfrontend/publication/" + pid;
        }
        /*let clappable=true;
         if(this.state.userId === response.data.article.writerid)
         {
            clappable=false;
         }
         else if( response.data.article.clapersIds.find(this.state.userId))
         {
           clappable=false;
         }
         else clappable=true;*/
        this.setState({
          body: response.data.article.body,
          title: response.data.article.title,
          description: response.data.article.description,
          date: date,
          name: response.data.writer.firstname,
          writerid: response.data.article.writerid,
          image: response.data.prof.image,
          //taglist: response.data.article.tagslist,
          claps: response.data.article.claps,
          pname: pname,
          pid: pid,
          plink: plink,
          pdesc: pdesc,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div style={articlePad}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={style1}
          >
            {this.state.title}
          </Grid>

        <Box style={style2}>
          <hr />
          <Grid container md={3}></Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={style2}
          >
            {this.state.description}
          </Grid>

          <hr />
        </Box>

        <Box style={{ paddingBottom: "1em" }}>
          <Grid container xs={2} md={2} lg={2}></Grid>
          <Grid container xs={8} md={8} lg={8}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
            <Grid container xs={4} md={4} lg={4}></Grid>
              <Grid container xs={3} md={4} lg={4}>
                <Grid xs={3} lg={3} md={3}>
                  {" "}
                  <img
                    src={this.state.image}
                    alt="Writer pic"
                    roundedCircle
                    fluid
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  ></img>
                </Grid>
                <Grid xs={4} md={4} lg={4}>
                  <Link
                    to={process.env.REACT_APP_profile_url + this.state.writerid}
                    style={{ color: "black" }}
                  >
                    {this.state.name}
                  </Link>{" "}
                  <br />
                  <p style={date}>{this.state.date}</p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Grid container display={{xs: "none", md:"none", lg:"block"}}>
        <Grid item lg={2} md={2} sm={2}></Grid>
          <Grid item lg={2} md={2} sm={2}>
            <Grid direction="column" style={{ position: "fixed", paddingLeft: "7em" }}>
              <Grid item style={{ marginBottom: "2em" }} lg={2}>
                <p style={publication}>
                  <Link to={this.state.plink} style={{ color: "black" }}>
                    {this.state.pname}
                  </Link>
                </p>
              </Grid>
              <Grid item alignItems="flex-start" lg={2}>
                <p style={pub_desc}>
                  {" "}
                  {this.state.pdesc}
                  <hr />
                </p>
              </Grid>
              <Grid item alignItems="flex-start" lg={2}>
                <img src={clapicon} alt="Claps:" style={icon} />
                {this.state.claps}
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={5} md={5} xs={5}>
            <p className="ck-content" alignItems="flex-start" style={body}>
              {parse(this.state.body)}
            </p>
          </Grid>
        </Grid>

        <Grid container>
        <Grid item lg={2} md={2} xs={2}></Grid>
          <Grid item lg={2}></Grid>

          {this.state.taglist.map((list) => {
            return (
              <Grid xs={1} md={1} lg={1}>
                <div style={tag}>list</div>
              </Grid>
            );
          })}
        </Grid>
        <hr />

        <Grid container>
          <Grid item lg={4} md={4} xs={4}></Grid>
          <Grid item xs={6} md={6} lg={6} 
            justify="center"
            alignItems="center">
            <img src={clapicon} alt="Claps" style={icon} fluid></img> {this.state.claps}
          </Grid>
        </Grid>

        <hr />
        <hr />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.user.isLogged,
  userId: state.user.userId,
});

export default connect(mapStateToProps)(Article);

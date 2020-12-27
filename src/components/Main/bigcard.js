import React, { Component } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: 1,
    boxShadow: "none"
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
  image: {},
  img: {
    alignItems: "strech",

    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

const head = {
  letterSpacing: "1px",
  fontWeight: "600",
  fontSize: "35px",
  color: "#333",
  fontFamily: "oswald, sans-serif",
};

const description = {
  marginTop: "0.5em",
  fontSize: "20px",
  color: "#333",
  fontFamily: "charter, Georgia, Cambria, 'Times New Roman', Times, serif",
};

class Card2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.data.updatedAt.substring(0, 10),
      img: "",
      body: this.props.data.body.substring(0,500),
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
          <CardContent className="try">
            <Typography gutterBottom variant="h5" component="h2" className="try">
            <Link to={process.env.REACT_APP_article_url + this.props.data._id} style={head} >
             <p style={{marginBottom: "0.5em"}}> {this.props.data.title} </p></Link>
            </Typography>
            <CardMedia
            component="img"
            alt="Post Image"
            height="400px"
            image={this.props.data.imageUrl}
            title={this.props.data.title}
          />
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={description}
            >
             {parse(this.state.body)}
            </Typography>
          </CardContent>
        <CardActions>
          
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Card2);

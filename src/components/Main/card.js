import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    boxShadow: "none"
  },
  image: {
    width: "150px",
    height: "150px",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

const head = {
  fontWeight: "700",
  fontSize: "20px",
  color: "#333",
  fontFamily: "Maven Pro",
};

const description = {
  color: "gray",
  fontSize: "16px",
  fontFamily: "sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif",
};

function min(x,y)
{
  if(x<y) return x;
  return y;
}

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.data.updatedAt.substring(0, 10),
      img: "",
      description: this.props.data.description.substring(0,min(100,this.props.data.description.length))+"...",
      title: this.props.data.title.substring(0,min(30,this.props.data.title.length))+".",
    };
  }



  render() {
    const { classes } = this.props;
    return (
      <Grid item className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>

            <Grid item xs={8} md={8} lg={8} container>
              <Grid item xs container direction="column">
                <Grid item xs={8} md={8} lg={8}>
                  <Typography gutterBottom noWrap  variant="subtitle1">
                  <Link to={"/medfrontend/post/" + this.props.data._id} style={head}>
                    {this.state.title} 
                    </Link>
                  </Typography>

                  <p variant="body2" color="textSecondary" noWrap={true} style={description}>
                    {this.state.description} </p>
                      <Typography variant="body2" style={{ cursor: "pointer", fontSize:"13px" }}>
                    {this.state.date}
                  </Typography>
                </Grid>
                
              </Grid>
            </Grid>
            <Grid item xs={4} md={4} lg={4}>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt="Pic of the post"
                  src={this.props.data.imageUrl}
                />
              </ButtonBase>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}


export default withStyles(styles)(Card);
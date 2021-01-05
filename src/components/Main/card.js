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
    paddingLeft: theme.spacing(2),
    margin: "0em",
    boxShadow: "none",
  },
  image: {
    width: "150px",
    height: "150px",
  },
  img: {
    margin: "0em",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

const head = {
  fontWeight: "700",
  fontSize: "20px",
  color: "#333",
};

const description = {
  color: "gray",
  fontSize: "16px",
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
      <hr/>
        <Paper className={classes.paper}>
          <Grid container>

            <Grid item xs={12} md={8} lg={8} container>
              <Grid item xs container direction="column">
                <Grid item xs={10} md={8} lg={8}>
                 
                  <Link to={"/medfrontend/post/" + this.props.data._id} style={head}>
                  <Typography style={{fontSize: "20px", fontWeight: "500"}} gutterBottom noWrap>{this.state.title} </Typography>
                    </Link>

                  <p variant="body2" color="textSecondary" noWrap={true} style={description}>
                    {this.state.description} </p>
                      <Typography variant="body2" style={{ cursor: "pointer", fontSize:"13px", marginTop: "auto" }}>
                    {this.state.date}
                  </Typography>
                </Grid>
                
              </Grid>
            </Grid>
            <Grid item xs={0} md={4} lg={4} className="d-none d-lg-block d-md-block">
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
        <hr/>
      </Grid>
    );
  }
}


export default withStyles(styles)(Card);
import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./tile.css"


const head = {
  fontWeight: "bold",
  fontSize: "20px",
  color: "black",
  fontFamily: "sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const imagestyle = {
    opacity: "90%"
}


const description = {
  color: "gray",
  fontSize: "16px",
  fontFamily: "sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif",
};

export default class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.data.updatedAt.substring(0, 10),
      img: "",
    };
  }
  render() {
    return (
        <Card style={{margin: "1em"}}>
        <Card.Img variant="top" src={this.props.data.imageUrl} style={imagestyle} alt="Image" className="cardimg"/>
        <Card.Body>
          <Card.Title><Link to={"/medfrontend/post/" + this.props.data._id} style={head}>
                {this.props.data.title}
              </Link></Card.Title>
          <Card.Text style={description}>
          {this.props.data.description}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{this.state.date}</small>
        </Card.Footer>
      </Card>

    );
  }
}

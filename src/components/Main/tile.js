import React, { Component } from "react";
import { Row, Col, Figure, Card, CardImg } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./tile.css"


const imge = "https://static.toiimg.com/photo/72975551.cms";
const head = {
  fontWeight: "bold",
  fontSize: "20px",
  color: "black",
  fontFamily: "sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const imagestyle = {
    opacity: "90%"
}

const tilestyle = {
  margin: "2em",
  backgroundColor: "lightgray",
};
const description = {
  color: "gray",
  fontSize: "16px",
  fontFamily: "sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const date = {
  fontSize: "12px",
  color: "gray",
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
        <div>
        <Card style={{margin: "1em"}}>
        <Card.Img variant="top" src={this.props.data.imageUrl} style={imagestyle} className="cardimg"/>
        <Card.Body>
          <Card.Title><Link to={"/post/" + this.props.data._id} style={head}>
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
      
      {/*<Row style={tilestyle} noGutters={true}>
        <Col xs={11} lg={9} md={9} style={{padding: "1em"}}>
          <Row>
            <Col>
              <Link to={"/post/" + this.props.data._id} style={head}>
                {this.props.data.title}
              </Link>
            </Col>
          </Row>
          <Row style={description}>
            <Col>{this.props.data.description}</Col>
          </Row>
          <Row>
            <Col style={date}>{this.state.date}</Col>
          </Row>
        </Col>
        <Col xs={1} lg={3} md={3} style={{padding: "0.1em"}}>
          <img
              width={150}
              height={150}
              alt={this.props.data.title}
              src={
                  this.props.data.imageUrl
              }
            />
          
        </Col>
            </Row>*/}
            </div>
    );
  }
}

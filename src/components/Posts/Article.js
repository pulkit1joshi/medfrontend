import React, { Component } from "react";
import parse from "html-react-parser";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { Link } from 'react-router-dom'

import { connect } from "react-redux";
import "./image.css";


const REACT_APP_base_url = "https://evening-anchorage-15734.herokuapp.com"

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

const publication = {
  fontSize: "1.2em",
  fontWeight: "bold",
};
const pub_desc = {
  color: "gray",
  paddingRight: "1.5em",
};
const tag = {
  backgroundColor: "lightgray",
  textAlign: "center",
  color: "gray",
  fontSize: "90%",
  paddingTop: "0.2em",
  paddingBottom: "0.20em",
  borderRadius: "0.2em",
};

const body = {
  fontFamily: "charter, Georgia, Cambria, 'Times New Roman', Times, serif",
  fontSize: "21px",
  lineHeight: "1.5em",
};

const icon = {
  opacity: "20%",
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
      taglist: [],
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
      .get(REACT_APP_base_url+"/api/article/" + this.props.match.params.id, {
        headers: headers,
      })
      .then((response) => {
        console.log("Called");
        console.log(response.data);
         let date  = response.data.article.updatedAt;
         date = date.substring(0,10);
         let pname ="";
         let pdesc = "";
         let pid = "";
         let plink = "";
         if(response.data.publication.exists === false)
         {
           pname=response.data.writer.firstname;
           pdesc= response.data.prof.about;
           pid = response.data.article.writerid;
           plink = "/medfrontend/profile/"+pid;
         }
         else
         {
           pname=response.data.publication.name;
           pdesc=response.data.publication.description;
           pid = response.data.publication.pid;
           plink = "/medfrontend/publication/"+pid;
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
          taglist: response.data.article.tagslist,
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
      <div>
        <Row>
          <Col xs={12} md={12} lg={2} className="d-none d-lg-block">
            <Row style={{ marginTop: "1em", position: "fixed" }}>
              <br />
            </Row>
          </Col>
          <Col xs={11} md={11} lg={7} style={style1}>
            {this.state.title}
          </Col>
          <Col xs={1} md={1} lg={2} fluid>
            {" "}
          </Col>
        </Row>
        <Row style={{ paddingBottom: "1em" }}>
          <Col xs={0} md={0} lg={2}></Col>
          <Col xs={11} md={11} lg={7}>
            <Row style={style2}>
              <Col>
                <hr />
                {this.state.description}
                <hr />
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col xs={3} md={4} lg={4}>
                <Row>
                  <Col lg={4} md={4}>
                    {" "}
                    <Image
                      src={this.state.image}
                      roundedCircle
                      fluid
                      style={{width: "50px", height:"50px"}}
                    ></Image>
                  </Col>
                  <Col xs={10} md={8} lg={8}>
                    <Link to={'/medfrontend/profile/'+this.state.writerid} style={{color: "black"}}>{this.state.name}</Link> <br />
                    <p style={date}>{this.state.date}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col xs={1} md={1} lg={2} fluid>
            {" "}
          </Col>
        </Row>
        <Row style={{ marginTop: "1em" }}>
          <Col xs={0} md={0} lg={2} className="d-none d-lg-block">
            <Row>
              <p style={publication}><Link to={this.state.plink} style={{color: "black"}}>{this.state.pname}</Link></p>
              <p style={pub_desc}>
                {" "}
                {this.state.pdesc}
                <hr />
              </p>
            </Row>

            <Row>
              <Col xs={0} md={0} lg={5}>
                <Image src={clapicon} style={icon} fluid></Image>
              </Col>
              <Col
                xs={0}
                md={0}
                lg={5}
                style={{ marginLeft: "-18%", color: "gray" }}
              >
                {this.state.claps}
              </Col>
            </Row>
            <Row>
             {/* <Col xs={0} md={0} lg={3} style={{ margin: "7%" }}>
                <Image
                  src={responseicon}
                  style={{ opacity: "70%" }}
                  fluid
                ></Image>
              </Col>
              <Col
                xs={0}
                md={0}
                lg={5}
                style={{ marginLeft: "-15%", color: "gray", marginTop: "7%" }}
              >
                2
              </Col>*/}
            </Row>
          </Col>
          <Col xs={11} md={11} lg={7} style={body} fluid>
            <Row>
              <Col className="ck-content">{parse(this.state.body)}</Col>
            </Row>
          </Col>
          <Col xs={1} md={1} lg={3} style={body} fluid></Col>
        </Row>
        

        <Row style={{ paddingTop: "3em", paddingBottom: "3em" }}>
          <Col xs={0} md={0} lg={2} fluid></Col>
          <Col xs={11} md={11} lg={7}>
            <Row>
              {this.state.taglist.map((list) => {
                return (
                  <Col xs={2} md={2} lg={2}>
                    <div style={tag}>list</div>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
                <hr/>
        <Row>
          <Col xs={0} md={0} lg={2} fluid></Col>
          <Col xs={11} md={11} lg={7} style={{ marginLeft: "1em" }} fluid>
            <Row>
            <Col xs={4} md={4} lg={4}>
                <Row className="align-items-center">
                  {/*<Col xs={6} md={5} lg={4}>
                    <Image src={responseicon} style={icon} fluid></Image>
                  </Col>
                   <Col xs={6} md={4} lg={6} style={{ margin: "-10%" }}>
                    Responses
                  </Col> */}
                </Row>
              </Col>
              <Col xs={3} md={3} lg={3} fluid>
                <Row className="align-items-center">
                  <Col xs={6} md={7} lg={7}>
                    <Image src={clapicon} style={icon} fluid></Image>
                  </Col>
                  <Col xs={6} md={5} lg={6} style={{ margin: "-17%" }}>
                    {this.state.claps} Claps
                  </Col>
                </Row>
              </Col>

              
            </Row>
          </Col>
        </Row>
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
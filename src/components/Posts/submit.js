import React, { Component } from "react";
//import Button from "react-bootstrap/Button";
//import axios from "axios";
//import Form from "react-bootstrap/Form";
import { updateUser } from '../../actions/userAction'
import { connect } from "react-redux";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import Editor from 'ckeditor5-custom-build/build/ckeditor';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios"
import { Redirect } from "react-router-dom";
const isImageUrl = require('is-image-url');

const REACT_APP_base_url = "https://evening-anchorage-15734.herokuapp.com"

const style1 = {
  borderTopWidth: "0em",
  borderRightWidth: "0em",
  borderLeftWidth: "0em",
  boxShadow: "none",
  borderRadius: "1px",
  backgroundColor: "white",
  fontSize: "22px",
  fontFamily: 'fell, Georgia, Cambria, "Times New Roman", Times, serif',
};

const head = {
  paddingTop: "1em",
  paddingBottom: "1em",
  borderTopWidth: "0em",
  borderRightWidth: "0em",
  borderLeftWidth: "0em",
  boxShadow: "none",
  backgroundColor: "white",
  fontFamily: 'fell, Georgia, Cambria, "Times New Roman", Times, serif',
  fontSize: "3.5em",
  fontStyle: "normal",
  lineHeight: "1.1em",
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
};



class Editor2 extends Component {
  constructor(props) {
    /*
     article  = {
        published: false,
        writerid: req.user._id,
        claps: 0,
        imageUrl: "try",
        body: req.body.body,
        title: req.body.title,
        description: req.body.description,
        clapersIds: [],
        editorsids: [req.user._id],
        tagslist: []
        
    };
    */
    super(props);
    this.state = {
      userName: "",
      isLogged: false,
      errortext: "",
      text: "",
      heading: "",
      image: "",
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setText(str)
  {
    this.setState({text: str});
  }

  onChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    console.log("Submit");
    if(!isImageUrl(this.state.image))
    {
      return this.setState({errortext: "Please enter a valid image link"});
    }
    const data = JSON.stringify({
      published: true,
      writerid: this.props.userId,
      claps: 0,
      imageUrl: this.state.image,
      body: this.state.text,
      description: this.state.description,
      title: this.state.heading,
      clappersIds: [],
      editorsids: [this.props.userId],
      tagslist: [],
    });

    const token = sessionStorage.getItem("medtoken");
    const headers = {
      "Content-Type": "application/json",
      "auth-token": token,
    };

    await axios
      .post(
        REACT_APP_base_url+"/api/article/create",
        data,
        {
          headers: headers,
        }
      )

      .then((response) => {
        if(response.data.error)
        {
          console.log("ERROR");
          return this.setState({errortext: response.data.msg});
        } else {
          console.log(response);
          this.setState({ succtext: "Updated", errortext: "" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.props.isLogged) {
      return (
        <div style={{paddingTop: "7em", marginLeft: "1em"}}>
        <Row style={{marginBottom:"1em"}}>
        <Col xs={12} md={12} lg={2} className="d-none d-lg-block">
            <Row style={{ marginTop: "1em", position: "fixed" }}>
              <br />
            </Row>
          </Col>
          <Col xs={11} md={11} lg={7}>
       	<p style={{color: "green"}}>{this.state.succtext}</p>
         <p style={{color: "red"}}>{this.state.errortext}</p>
        <Form onSubmit={this.handleSubmit}>
        <Button type="submit">Publish</Button>
        <hr/>
        <Form.Control
            className="justify-content-md-center"
            placeholder= "Title"
            type="text"
            name="heading"
            style={head}
            size="lg"
            onChange={this.onChange}
            value={this.state.heading}
          />
          <hr/>
          <Form.Control
            className="justify-content-md-center"
            placeholder= "Post description"
            type="text"
            name="description"
            style={style2}
            size="lg"
            onChange={this.onChange}
            value={this.state.description}
          />
          <div style={{margin: "1em"}}>
          
          </div>
          <div style={style1}>
          <CKEditor
          
          editor={ClassicEditor}
          data={this.state.text}
          
          config={{    
            placeholder: "Enter body here",
          toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'numberedList', 'bulletedList', 'insertTable',
             'mergeTableCells', '|', 'undo', 'redo'],
             styles: [
        'full',
        'side',
        'alignLeft', 'alignCenter', 'alignRight'
      ],
        }}   
        
          onChange={(event, editor) => {
            const data = editor.getData()
            this.setText(data);
          }}
          onError={(err, errd) => {
            console.log(err);
            console.log(errd);
          }}
          />
          </div>
          <Form.Control
            className="justify-content-md-center"
            placeholder= "Add an image link"
            type="text"
            name="image"
            style={style2}
            size="lg"
            onChange={this.onChange}
            value={this.state.image}
          />
          </Form>
          
          </Col>
          </Row>
          </div>
        
      );
    } else {
      return <Redirect to="/medfrontend/auth/login" />
    }
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.user.isLogged,
  userName: state.user.userName,
  userId: state.user.userId,
  email: state.user.email
});

export default connect(mapStateToProps, { updateUser })(Editor2);

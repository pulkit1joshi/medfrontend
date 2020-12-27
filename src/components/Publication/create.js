import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'


class publicationForm extends Component {
    render() {
        if(this.props.isLogged)
        {
        return (
            
        )
        }
        else{
            return  <Redirect to={"/medfrontend/auth/login"}/>
        }
    }
}

const mapStateToProps = (state) => ({
    isLogged: state.user.isLogged,
    userName: state.user.userName,
    userId: state.user.userId,
    email: state.user.email
  });
  
  export default connect(mapStateToProps, { addPublication })(publicationForm);
  
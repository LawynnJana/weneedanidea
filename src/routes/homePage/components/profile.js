import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Profile extends Component {

  componentWillMount(){
    console.log("Profile.js mounted");
  }

  render() {
    return (<div> Profile </div>);
  }
}

export default withRouter(Profile);

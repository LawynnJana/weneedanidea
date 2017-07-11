import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Profile extends Component {

  componentWillMount(){
    console.log("Profile.js mounted");
  }

  render() {
    const { user } = this.props;
    console.log(this.props.user);
    return (
      <div>
        <h1>Profile</h1>
        <h2>{ user.accountHandle }</h2>
        <i className="glyphicon glyphicon-envelope"></i> {user.email}

    </div>);
  }
}

export default withRouter(Profile);

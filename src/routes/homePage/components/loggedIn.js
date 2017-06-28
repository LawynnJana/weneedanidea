import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions'
import { withRouter } from 'react-router-dom';

class LoggedIn extends Component {


  handleLogout() {
    console.log("Logout");
    this.props.logOut(() => {
      this.props.history.push('/login');
    });
  }

  render() {
    const { user } = this.props;
    console.log('home user: ', user);
    return(
      <div >
        <div className="page-header">
            <h1>Hello! {user.email}</h1>
        </div>
        <button onClick={this.handleLogout.bind(this)} className="btn btn-info">Logout</button>
      </div>
    );
  }
}


function mapStateToProps(state){
  return {

  }
}

export default withRouter(connect(mapStateToProps, { logOut })(LoggedIn));

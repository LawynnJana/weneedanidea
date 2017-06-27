import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser, logOut } from '../actions'
import { withRouter } from 'react-router-dom';
class LoggedIn extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  handleLogout() {
    console.log("Logout");
    this.props.logOut(() => {
      this.props.history.push('/login');
    });
  }

  render() {
    return(
      <div >
        <div className="page-header">
            <h1>Hello! {this.props.username}</h1>
        </div>
        <button onClick={this.handleLogout.bind(this)} className="btn btn-info">Logout</button>
      </div>
    );
  }
}


function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps, { fetchUser, logOut })(LoggedIn));

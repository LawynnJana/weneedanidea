import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import MyPosts from './myPosts';

class LoggedIn extends Component {

  handleLogout() {
    console.log("Logout");
    this.props.logOut(() => {
      this.props.history.push('/login');
    });
  }

  render() {
    const { user } = this.props;
    return(
      <div className="row">
        <div className="col-xs-12 col-md-12 col-sm-12">
          <div className="panel panel-info">
            <div className="panel-heading">
              <h3 className="panel-title">Welcome {user.firstName} {user.lastName} </h3>
            </div>
            <div className="panel-body">
              <MyPosts/>
              <Link className="btn btn-info" to="/posts/new">Create Post</Link>
            </div>
            <button onClick={this.handleLogout.bind(this)} className="btn btn-info">Logout</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { logOut })(LoggedIn));

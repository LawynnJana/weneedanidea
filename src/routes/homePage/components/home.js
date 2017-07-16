import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Home extends Component {

  componentDidMount() {
    console.log('Home.js mounted');
  }

  render() {
    const { user } = this.props;
    if(!user) {
      return (<div> Getting user data... </div>);
    }
    return(
      <div className="row">
        <div className="col-xs-12 col-md-12 col-sm-12">
          <div className="panel panel-info">
            <div className="panel-heading">
              <h3 className="panel-title">Welcome {user.accountHandle}! </h3>
            </div>
            <div className="panel-body">
              <Link className="btn btn-info" to='/user/new'>Create Post</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { logOut })(Home));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import NewsFeed from './newsFeed';

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
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Welcome {user.accountHandle}! </h3>
            </div>
            <div className="panel-body">
              <NewsFeed/>
              <Link className="btn btn-default" to='/user/new'>Create Post</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { logOut })(Home));

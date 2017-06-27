import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LoggedIn from './components/loggedIn';

class Home extends Component {

  render() {
    return (
      <div>
        <LoggedIn username={this.props.sessionStatus.username}/>
      </div>
    );
  }
}

function mapStateToProps({ sessionStatus }){
  return {
    sessionStatus
  }
}

export default connect(mapStateToProps)(Home);

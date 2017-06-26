import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LoggedIn from './components/loggedIn';
import NotLoggedIn from './components/notloggedIn';

class Home extends Component {

  render() {
    if(this.props.sessionStatus.status === 200){
      return (<LoggedIn username={this.props.sessionStatus.username}/>);
    }
    return (
      <div>
        <NotLoggedIn/>
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

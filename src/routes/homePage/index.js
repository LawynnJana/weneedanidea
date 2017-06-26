import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LoggedIn from './components/loggedIn';
import NotLoggedIn from './components/notloggedIn';
// import { firebaseApp } from '../../firebase'
class Home extends Component {

  // componentWillMount() {
  //   firebaseApp.auth().onAuthStateChanged((user) => {
  //     if(user){
  //       this.authHandle(user);
  //     } else {
  //
  //     }
  //   })
  // }
  render() {
    if(this.props.sessionStatus.status === 200){
      //console.log("Session persisted");
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

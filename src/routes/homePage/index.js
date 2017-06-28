import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LoggedIn from './components/loggedIn';
import { firebaseApp } from '../../firebase';
import { fetchUser } from './actions'

class Home extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged( user => {
      if (user) {
        if(!user.emailVerified){
          this.props.history.push('verification');
        }
        else {
          console.log('fetching user...');
          this.props.fetchUser();
        }
      } else {

      }
    });
  }

  render() {
    console.log('app:', this.props.currentUser);
    if(!this.props.currentUser){
      return (<div>Loading...</div>);
    }
    return (
      <div>
        <LoggedIn user={this.props.currentUser}/>
      </div>
    );
  }
}

function mapStateToProps({ currentUser }){
  return {
    currentUser
  }
}

export default connect(mapStateToProps, { fetchUser })(Home);

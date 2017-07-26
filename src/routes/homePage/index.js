import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp } from '../../firebase';
import { fetchUser } from './actions'
import _ from 'lodash';
import { Switch, Route, Link, withRouter } from 'react-router-dom';

import NavBar from './components/navbar';
import Home from './components/home';
import Posts from './components/posts';
import PostsNew from './components/postsNew';
import UserProfile from './components/profile';
import UserHandle from './components/userHandle';
import PostShow from './components/postShow';


class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    firebaseApp.auth().onAuthStateChanged((user)=>{
      if (user) {
        if(!user.emailVerified){
          console.log('Not verified, redirect to verification!');
          this.props.history.push('verification');
        }
        else {
          console.log('Verified, fetching user!', user);
          if(user.displayName === null){
            console.log("Displayname not set, push('user/accounthandle')")
            this.props.history.push('user/accounthandle')
          }
          this.props.fetchUser(user.uid);
          console.log("user: ", user);
          //if fetchUser is null, prompt user to fill out account handle
        }

      }
      else if(!user) {
        console.log("Not logged in, redirect to login!")
        this.props.history.push('login');
      }
    });
  }

  render() {
    //component doesnt rerender
    if(_.isEmpty(this.props.currentUser)){
      return (<div>Loading</div>);
    }
    return (
      <div>
        <NavBar/>
        <Switch>
          <Route path="/profile" render={() => <UserProfile user={this.props.currentUser}/>} />
          <Route path="/user/show/:id" render={(props) => <PostShow {...this.props} {...props}/>} />
          <Route path="/user/posts" render={() => <Posts/>} />
          <Route path="/" render={() => <Home user={this.props.currentUser} {...this.props}/>} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    registered: state.registerStatus.registered
  }
}

export default withRouter(connect(mapStateToProps, { fetchUser })(User));

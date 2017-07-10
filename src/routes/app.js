import React, { Component } from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { browserHistory }  from 'react-router'

import UserHome from './homePage';
import LoginPage from './loginPage';
import RegisterPage from './registerPage';
import VerifyPage from './loginPage/components/verification';
import PostsNew from './homePage/components/postsNew';
import PostsShow from './homePage/components/postsShow';
import UserHandle from './homePage/components/userHandle';
import { firebaseApp } from '../firebase';



const Post = () => {
  return
    (<div>
      New Post!
    </div>);
}

class App extends Component {

  constructor(props){
    super(props);

    this.isAuthenticated = this.isAuthenticated.bind(this);

  }
  isAuthenticated() {
    if(firebaseApp.auth().getUser){
      console.log("Logged in");
      //this.props.history.push('/');
    }
  }

  render() {

    // /new, /user/accounthandle should be child routes of /
    return(
      <div>
        <Switch>
          <Route path="/login" render={()=> <LoginPage/>} />
          <Route path="/verification" render={()=> <VerifyPage/>} />
          <Route path="/register" render={()=> <RegisterPage/>} />

          <Route path="/user/accounthandle" render={()=> <UserHandle/>} />
          <Route path="/user/posts" component={PostsShow} />
          <Route path="/user/new" component={PostsNew} />
          <Route exact path="/" render={()=> <UserHome/>} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

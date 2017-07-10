import React, { Component } from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { browserHistory }  from 'react-router'

// database reference
import { firebaseApp } from '../firebase';

// routes
import UserHome from './homePage';
import LoginPage from './loginPage';
import RegisterPage from './registerPage';
import VerifyPage from './loginPage/components/verification';
import UserHandle from './homePage/components/userHandle';
import PostsNew from './homePage/components/postsNew';

class App extends Component {

  constructor(props){
    super(props);
  }

  render() {
    // /user/new be a modal?
    return (
      <div>
        <Switch>
          <Route exact path="/login" render={()=> <LoginPage/>} />
          <Route exact path="/verification" render={()=> <VerifyPage/>} />
          <Route exact path="/register" render={()=> <RegisterPage/>} />
          <Route path="/user/accounthandle" render={()=> <UserHandle/>} />
          <Route path="/user/new" component={PostsNew} />
          <Route path="/" render={()=> <UserHome/>} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

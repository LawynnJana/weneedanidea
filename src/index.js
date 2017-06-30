import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {browserHistory} from 'react-router';

// Local storage
import { loadState, saveState } from './localstorage'
import { firebaseApp } from './firebase'
// Routes
import Home from './routes/homePage';
import LoginPage from './routes/loginPage'
import RegisterPage from './routes/registerPage'
import VerifyPage from './routes/loginPage/components/verification'
import PostsNew from './routes/homePage/components/postsNew'
import PostsShow from './routes/homePage/components/postsShow'
const persistedState = loadState();
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(reducers, persistedState);
store.subscribe(() => {
  return saveState({
    sessionStatus: store.getState().sessionStatus
  });
});

// If user is logged in, redirec to home page
// when routing to /login, /register, /verification
// !!! Can use firebase built in functions
function isAuthenticated() {
  // firebaseApp.auth().onAuthStateChanged( user => {
  //   if (user) {
  //     console.log("is logged in");
  //     browserHistory.push('/');
  //   }
  // });
  if(store.getState().sessionStatus.loggedIn){
    browserHistory.push('/');
  }
}
function isNotLoggedIn() {
  // firebaseApp.auth().onAuthStateChanged( user => {
  //   if (!user) {
  //       console.log("Not logged in");
  //       browserHistory.push('login');
  //   }
  // });
  if(!store.getState().sessionStatus.loggedIn){
    console.log('failure');
    browserHistory.push('login');
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:id" component={PostsShow} onEnter={isAuthenticated()} />
          <Route path="/login" component={LoginPage} onEnter={isAuthenticated()}/>
          <Route path="/verification" component={VerifyPage} onEnter={isAuthenticated()} />
          <Route path="/register" component={RegisterPage} onEnter={isAuthenticated()} />
          <Route exact path="/" component={Home} onEnter={isNotLoggedIn()}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));

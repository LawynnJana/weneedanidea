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

// Routes
import Home from './routes/homePage';
import LoginPage from './routes/loginPage'
import RegisterPage from './routes/registerPage'
import VerifyPage from './routes/loginPage/components/verification'

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
  if(store.getState().sessionStatus.loggedIn){
    browserHistory.push('/');
  }
}
function isNotLoggedIn() {
  if(!store.getState().sessionStatus.loggedIn){
    browserHistory.push('/login');
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/login" component={LoginPage} onEnter={isAuthenticated()}/>
          <Route path="/verification" component={VerifyPage} onEnter={isAuthenticated()} />
          <Route path="/register" component={RegisterPage} onEnter={isAuthenticated()} />
          <Route path="/" component={Home} onEnter={isNotLoggedIn()}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));

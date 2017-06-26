import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import reducers from './reducers';

import { loadState, saveState } from './localstorage'
// Routes
import Home from './routes/homePage';
import LoginPage from './routes/loginPage'
import RegisterPage from './routes/registerPage'
import VerifyPage from './routes/registerPage/components/verification'

const persistedState = loadState();
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(reducers, persistedState);
store.subscribe(() => {
  return saveState({
    sessionStatus: store.getState().sessionStatus
  });
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register/verification" component={VerifyPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {browserHistory} from 'react-router';

// Local storage
//import { loadState, saveState } from './localstorage';

// Routes
import App from './routes/app';



//const persistedState = loadState();
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import sessionReducer from '../routes/reducerGlobal/session_reducer'
import userReducer from '../routes/homePage/reducers/user_reducer';
import registerReducer from '../routes/registerPage/reducers/register_reducer';
import loginReducer from '../routes/loginPage/reducers/login_reducer';
import posts from '../routes/homepage/reducers/fetch_posts_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  posts,
  currentUser: userReducer,
  registerStatus: registerReducer,
  loginStatus: loginReducer,
  sessionStatus: sessionReducer,
});

export default rootReducer;

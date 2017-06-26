import { combineReducers } from 'redux';
import loginReducer from '../routes/loginPage/reducers/login_reducer';
import userReducer from '../routes/homePage/reducers/user_reducer';
import registerReducer from '../routes/registerPage/reducers/register_reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  form: formReducer,
  sessionStatus: loginReducer,
  user: userReducer,
  registerStatus: registerReducer
});

export default rootReducer;

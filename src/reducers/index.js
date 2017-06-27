import { combineReducers } from 'redux';
import sessionReducer from '../routes/reducerGlobal/session_reducer';
import userReducer from '../routes/homePage/reducers/user_reducer';
import registerReducer from '../routes/registerPage/reducers/register_reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  form: formReducer,
  sessionStatus: sessionReducer,
  user: userReducer,
  registerStatus: registerReducer
});

export default rootReducer;

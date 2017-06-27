import { LOGIN, LOGIN_ERROR } from '../loginPage/actions/constants';
import { LOGOUT } from '../homePage/actions/constants'
const initialState = {
  loggedIn: false
}

export default function(state=initialState, action){
  const { payload } = action;
  switch(action.type){
    case LOGIN:
      return {
        loggedIn: payload.loggedIn,
        username: payload.username,
        status: payload.status
      }
      
    case LOGIN_ERROR:
      return {
        error: payload.error,
        loggedIn: payload.loggedIn,
        message: payload.message
      }

    case LOGOUT:
      return {
        loggedIn: payload.loggedIn
      }

    default:
      return state;
  }
}

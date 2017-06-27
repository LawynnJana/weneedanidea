import { LOGIN } from '../loginPage/actions/constants';
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

    case LOGOUT:
      return {
        loggedIn: payload.loggedIn
      }

    default:
      return state;
  }
}

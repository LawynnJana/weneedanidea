import { LOGIN } from '../actions/constants';

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
    default:
      return state;
  }
}

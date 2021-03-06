import { LOGIN_SUCC, LOGIN_ERROR, RESET_LOGIN_STATE } from '../actions/constants';

export default function(state = {error: false}, action){
  switch(action.type){
    case LOGIN_SUCC:
      return action.payload;

    case LOGIN_ERROR:
      return {
        error: true,
        message: 'Please enter a valid username and/or password!'
      }

    case RESET_LOGIN_STATE:
      return action.payload;
    default:
      return state;
  }
}

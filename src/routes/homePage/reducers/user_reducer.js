import { FETCH_USER } from '../actions/constants';

export default function(state = {}, action){
  switch(action.type){
    case FETCH_USER:
      return action.payload;
    default:
      return state;
  }
}

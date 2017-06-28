import { FETCH_USER } from '../actions/constants';

export default function(state = {}, action){
  switch(action.type){
    case FETCH_USER:
      console.log('Payload ', action.payload)
      return action.payload;
    default:
      return state;
  }
}

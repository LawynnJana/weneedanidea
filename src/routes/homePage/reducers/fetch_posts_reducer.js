import { FETCH_POSTS, FETCH_POST } from '../actions/constants';

export default function(state = {}, action){
  switch(action.type){
    case FETCH_POSTS:
      console.log('Post from reducer:', action.payload);
      return action.payload;
    case FETCH_POST:
      return { ...state, [action.payload.id]: action.payload}
    default:
      return state;
  }
}

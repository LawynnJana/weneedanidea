import { FETCH_SUBCATEGORY } from '../actions/constants';

export default function(state = [], action){
  switch(action.type){
    case FETCH_SUBCATEGORY:
      return action.payload;
    default:
      return state;
  }
}

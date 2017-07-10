import { REGISTER_SUCCESS, REGISTER_ERROR } from '../actions';

const initialState = {
  error: false
}
export default function(state=initialState, action){
  switch(action.type){
    case REGISTER_SUCCESS:
      console.log("Register succes!");
      return {
        verified: false,
        registered: true,
        error: false
       }
    case REGISTER_ERROR:
      console.log(action.payload);
      return action.payload
    default:
      return state;
  }
}

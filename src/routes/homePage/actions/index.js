import { FETCH_USER } from './constants';
import { firebaseAuth } from '../../../reducers/index';

export function fetchUser(id){

  return dispatch => {
    dispatch({
      type: FETCH_USER,
      payload: ''
    })
    // firebaseAuth.onAuthStateChanged(function(user) {
    //   if (user) {
    //     // User is signed in.
    //     console.log("User signedin")
    //     dispatch({
    //       type: FETCH_USER,
    //       payload: ''
    //     })
    //   } else {
    //     // No user is signed in.
    //     console.log("No User signedin")
    //   }
    // });
  }
}

import { FETCH_USER, LOGOUT } from './constants';
import { firebaseApp} from '../../../firebase';

export function fetchUser(){

  return dispatch => {
    let currUser;
    firebaseApp.auth().onAuthStateChanged(function(user) {
      if(user) {
        console.log('dispatch fetchUser(): ', user);
        return dispatch => {
          dispatch({
            type: FETCH_USER,
            payload: user
          })
        }
      } else {
        console.log("Error @ function fetchUser in hompage/actions/index.js");
      }
    });
  }
}

export function logOut(cb){
  return dispatch => {
    cb();
    dispatch({
      type: LOGOUT,
      payload: {
        loggedIn: false
      }
    })

  }
}

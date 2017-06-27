import { FETCH_USER, LOGOUT } from './constants';
import { firebaseAuth } from '../../../reducers/index';

export function fetchUser(id){

  return dispatch => {
    dispatch({
      type: FETCH_USER,
      payload: ''
    })
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

import { LOGIN, LOGIN_ERROR, LOGIN_SUCC, RESET_LOGIN_STATE } from './constants';
import firebase from 'firebase'
import { firebaseApp } from '../../../firebase'


// Listen for user logging in
export function loginRequest(values, callback) {

  // Sign into app and authenticate with FireBase's users data base
  return dispatch => {

    if(values==='resetState'){
      dispatch({
        type: RESET_LOGIN_STATE,
        payload: {}
      })
    }
    else{
      firebaseApp.auth().signInWithEmailAndPassword(values.username, values.password).then((result)=>{
        console.log("user: ", result);
        dispatch({
          type: LOGIN,
          payload: {
            status: 200,
            username: values.username,
            loggedIn: true
          }
        });

        dispatch({
          type: LOGIN_SUCC,
          payload: {
            error: false,
            message: ''
          }
        })

        // Redirect to user's home page on success
        callback();

      }).catch((error) => {
        console.log("Login ERROR  Error code: ", error.code, " error message: ", error.message, " end of err.");
        dispatch({
          type: LOGIN_ERROR,
          payload:{
            error: true,
            message: "Enter a valid username or password",
          }
        })
      })
    }
  }
}

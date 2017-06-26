export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
import { firebaseApp } from '../../../firebase/index';
//import firebase from 'firebase'
// values contains username and password
//const ROOT_URL = 'https://ogapp-8e9af.firebaseio.com/';

// var config = {
//   apiKey: "AIzaSyBjE6oueQqbkYKbg5SAcRAhHTM7rHiIW9k",
//   authDomain: "ogapp-8e9af.firebaseapp.com",
//   databaseURL: "https://ogapp-8e9af.firebaseio.com",
//   projectId: "ogapp-8e9af",
//   storageBucket: "ogapp-8e9af.appspot.com",
//   messagingSenderId: "275433287605"
// };
//
// const firebaseApp = firebase.initializeApp(config);
//
// const db = firebaseApp.database();
// const auth = firebaseApp.auth();

export function registerUser(values, callback, errorCallBack) {
  return dispatch => {
    firebaseApp.auth().createUserWithEmailAndPassword(values.email, values.password)
    .then(() => {
      console.log("Successfully registered user!");
      dispatch({
        type: REGISTER_SUCCESS,
        payload: "register"
      });
      callback();
    })
    .catch(error => {
      const errCode = error.code;
      const errVal = error.message;
      console.log("Error code:", errCode, " and Error value:", errVal);
      errorCallBack();
      dispatch({
        type: REGISTER_ERROR,
        payload: {
          message: errVal,
          error: true
        }
      });

    })
  }

}

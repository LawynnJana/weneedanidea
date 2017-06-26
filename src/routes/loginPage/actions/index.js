import { LOGIN } from './constants';
import firebase from 'firebase'
// import { firebaseAuth } from '../../../firebase'

var config = {
  apiKey: "AIzaSyBjE6oueQqbkYKbg5SAcRAhHTM7rHiIW9k",
  authDomain: "ogapp-8e9af.firebaseapp.com",
  databaseURL: "https://ogapp-8e9af.firebaseio.com",
  projectId: "ogapp-8e9af",
  storageBucket: "ogapp-8e9af.appspot.com",
  messagingSenderId: "275433287605"
};

export const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.database();
const auth = firebaseApp.auth();

// Listen for user logging in
export function loginRequest({ username, password}, callback) {

  // Sign into app and authenticate with FireBase's users data base
  return dispatch => {


    firebaseApp.auth().signInWithEmailAndPassword(username, password).then(()=>{

      dispatch({
        type: LOGIN,
        payload: {
          status: 200,
          username,
          loggedIn: true
        }
      });

      // Redirect to user's home page on success
      callback();

    }).catch((error) => {
      console.log("Error code: ", error.code, " error message: ", error.message, " end of err.");
      dispatch({
        type: LOGIN,
        payload:{
          status: 400,
          username,
          loggedIn: false
        }
      })
    })
  }
}

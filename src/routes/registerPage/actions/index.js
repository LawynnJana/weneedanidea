export const REGISTER = 'REGISTER';

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

export function registerRequest(values, callback) {

  return {
    type: REGISTER,
    payload: "register"
  }
}

import firebase from 'firebase'


var config = {
  apiKey: "AIzaSyBjE6oueQqbkYKbg5SAcRAhHTM7rHiIW9k",
  authDomain: "ogapp-8e9af.firebaseapp.com",
  databaseURL: "https://ogapp-8e9af.firebaseio.com",
  projectId: "ogapp-8e9af",
  storageBucket: "ogapp-8e9af.appspot.com",
  messagingSenderId: "275433287605"
};

export const firebaseApp = firebase.initializeApp(config);
export const firebaseDb = firebaseApp.database();
export const firebaseAuth = firebaseApp.auth();
export const user = firebase.auth().currentUser;

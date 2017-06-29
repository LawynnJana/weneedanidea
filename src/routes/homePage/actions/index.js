import { FETCH_USER, LOGOUT } from './constants';
import { firebaseApp} from '../../../firebase';

export function fetchUser(uid){
  return dispatch => {
    firebaseApp.database().ref('Users/'+uid).once("value").
    then((snapshot) => {
      dispatch({
        type: FETCH_USER,
        payload: snapshot.val()
      });
    });
  }
}


export function logOut(cb){
  return dispatch => {
    firebaseApp.auth().signOut().then(()=>{
      console.log("Signed out.");
    }, (error) => {
      console.log("Error signing out: ", error);
    })
    cb();
    dispatch({
      type: LOGOUT,
      payload: {
        loggedIn: false
      }
    })

  }
}

export function createPost(){
  
}

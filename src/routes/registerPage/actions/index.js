export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
import { firebaseApp } from '../../../firebase/index';

function addUser(values, dbRef){
  dbRef.set({
    accountHandle: values.firstName,
    creationDate: new Date(),
    dateOfBirth: "?",
    firstName: values.firstName,
    lastName: values.lastName,
    gender: "?"
  });
}

function addAccountHandle(userId, ref){
  ref.set({
    uid: userId
  })
}

export function registerUser(values, callback, errorCallBack) {
  return dispatch => {
    firebaseApp.auth().createUserWithEmailAndPassword(values.email, values.password)
    .then(() => {

      const user = firebaseApp.auth().currentUser;
      const uid = user.uid;
      const accHandle = values.username;

      // Add user to database
      addUser(values, firebaseApp.database().ref('Users/'+uid));
      addAccountHandle(uid, firebaseApp.database().ref('AccountHandles/'+accHandle));

      // Update state
      dispatch({
        type: REGISTER_SUCCESS,
        payload: values
      });

      // Redirect to homepage
      callback();
    })
    .catch(error => {
      const errCode = error.code;
      const errVal = error.message;
      console.log("Error code:", errCode, " and Error value:", errVal);
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

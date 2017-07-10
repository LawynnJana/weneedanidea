export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
import { firebaseApp } from '../../../firebase/index';


export function registerUser(values, callback) {
  return dispatch => {
    firebaseApp.auth().createUserWithEmailAndPassword(values.email, values.password)
    .then(() => {
      console.log("User registered");
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

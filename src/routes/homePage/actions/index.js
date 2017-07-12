import { FETCH_USER, LOGOUT, SET_USR_HANDLE, PROFILE_EDIT } from './constants';
import { firebaseApp } from '../../../firebase';

export function fetchUser(uid){
  return dispatch => {
    const user = firebaseApp.auth().currentUser;
    const email = user.email;
    const photoURL = user.photoURL;

    firebaseApp.database().ref('Users/'+uid).once("value").
    then((snapshot) => {
      const temp = Object.assign({email, photoURL}, snapshot.val());
      dispatch({
        type: FETCH_USER,
        payload: temp
      });
    });
  }
}

function addToUserDB(accountHandle, ref){
  ref.set({
    accountHandle,
    dateOfBirth: "",
    firstName: "",
    gender: "",
    lastName: "",
    verificationDate: ""
  })
}

function addAccHandleToDb(accountHandle, userRef){
  userRef.set(accountHandle)
}

export function submitUserHandle( { accountHandle } , callback){
  return dispatch => {
    //addUser(values, firebaseApp.database().ref('Users/'+uid));
    const user = firebaseApp.auth().currentUser;
    firebaseApp.database().ref('AccountHandles/'+accountHandle).once("value")
    .then((snapshot) => {
      const exist = (snapshot.val()!==null)
      if(exist){
        alert("Account handle already exists!");
      } else{
        console.log("handle doesn't exist!");

        addAccHandleToDb(accountHandle, firebaseApp.database().ref('AccountHandles/'+accountHandle));
        addToUserDB(accountHandle ,firebaseApp.database().ref('Users/'+ user.uid));

        // Get default profile picture

        firebaseApp.storage().ref().child('images/default_profile_img.png').getDownloadURL().then((url) => {
          console.log("photo url added");
          console.log(url);

          // update firebase user
          user.updateProfile({
            displayName: accountHandle,
            photoURL: url
          }).then(() => {
            console.log("Success setting account handle")
            callback();
          },
            (error) => {console.log("Failure setting account handle")}
          );
        })
      }
    }).catch((err) => {
      console.log('Error when submitting user handle: ', err)
    });

    dispatch({
    type: SET_USR_HANDLE,
    payload: accountHandle
    })
  }
}

export function logOut(cb){
  return dispatch => {
    firebaseApp.auth().signOut().then(()=>{
      console.log("Signed out.");
    }, (error) => {
      console.log("Error signing out: ", error);
    })

    dispatch({
      type: LOGOUT,
      payload: {
        loggedIn: false
      }
    })
    cb();
  }
}

export function submitProfileChanges({accontHandle, img_src}){
  return dispatch => {
    const user = firebaseApp.auth().currentUser;
    user.updateProfile({
      displayName: accountHandle,
      photoURL: img_src
    }).then(() => {
      console.log("Success updating profile")
      //update user
      fetchUser(user.uid);
    },
      (error) => {console.log("Failure updating profile")}
    );
  }
}

export function createPost(values){
  return dispatch => {
    // const user = firebaseApp.auth().currentUser;
    // firebaseApp.database().ref('Posts/'+user.uid+'/'+values.title).set({
    //   title: values.title,
    //   content: values.content,
    // })
  }
}

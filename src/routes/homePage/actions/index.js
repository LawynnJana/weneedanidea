import {
  FETCH_USER,
  LOGOUT,
  SET_USR_HANDLE,
  PROFILE_EDIT,
  FETCH_POSTS,
  FETCH_POST,
  FETCH_SUBCATEGORY
} from './constants';

import { firebaseApp } from '../../../firebase';

export function fetchUser(uid){
  return dispatch => {
    const user = firebaseApp.auth().currentUser;
    const email = user.email;
    const photoURL = user.photoURL;
    console.log("fetch user");
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
    const user = firebaseApp.auth().currentUser;

    firebaseApp.database().ref('AccountHandles/'+accountHandle.toLowerCase()).once("value")
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

export function submitProfileChanges({accountHandle, picture}, callback){
  return dispatch => {

    const user = firebaseApp.auth().currentUser;

    if(picture){
      console.log("Pic change")
      const ref = firebaseApp.storage().ref(user.uid+'/profile/profile_pic');
      ref.put(picture).then(()=>{
        console.log("gang")
          firebaseApp.storage().ref().child(user.uid+'/profile/profile_pic').getDownloadURL().then((photoURL) => {
            console.log("success")
            user.updateProfile({
              photoURL
            });
            dispatch(fetchUser(user.uid));
          })
        });
    }

    if(accountHandle){
      firebaseApp.database().ref('AccountHandles/'+accountHandle.toLowerCase()).once("value")
      .then((snapshot) => {
        const exist = (snapshot.val()!==null)
        if(exist && accountHandle.toLowerCase() !== user.displayName.toLowerCase()) {
          alert("Account handle already exists!");
        }
        else {
          if(accountHandle === user.displayName){
            alert("Same name! No change!");
          }
          else{
            console.log("handle doesn't exist!");

            firebaseApp.database().ref('AccountHandles/'+user.displayName.toLowerCase()).remove();
            addAccHandleToDb(accountHandle, firebaseApp.database().ref('AccountHandles/'+accountHandle.toLowerCase()));

            const updates = {}
            updates['/Users/'+user.uid+'/accountHandle'] = accountHandle;
            firebaseApp.database().ref().update(updates);
            //addToUserDB(accountHandle ,firebaseApp.database().ref('Users/'+ user.uid));

            user.updateProfile({
              displayName: accountHandle,
            }).then(() => {
              console.log("Success updating profile")
              //update user

              dispatch(fetchUser(user.uid));
            },
              (error) => {console.log("Failure updating profile")}
            );
          }
        }
      });
    }

  }
}

// new post
export function createPost({title, category, content, subcategory}, callback){
  return dispatch => {

    console.log('category', category.category);
    console.log('subcategory', subcategory.subcategory);

    const { uid } = firebaseApp.auth().currentUser;
    const userRef = firebaseApp.database().ref(`Users/${uid}/Posts/Active`).push();
    const postsRefKey = userRef.key;
    const Category = category.category.replace(/\s/g, '');
    const SubCategory = subcategory.subcategory.replace(/\s/g, '');
    const today = new Date(),
      CreationDate = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate(),
      time = today.getTime();

    userRef.set({
      Location: {
        Category,
        SubCategory,
      },
      Statistics: {
        Dislikes: 0,
        Likes: 0,
        Shares: 0,
      }
    });
    const postsRef = firebaseApp.database().ref(`Posts/${Category}/${SubCategory}/Active/${postsRefKey}`);
    postsRef.set({
      Body: content,
      CardInfo: {
        CreationDate,
        Dislikes: 0,
        Likes: 0,
        Shares: 0,
        Title: title,
      },
      LastEditDate: CreationDate,
      Reports: 0,
      UserId: uid
    });
    // ref.set({
    //   title: title,
    //   categories:category.value,
    //   subcategory: subcategory.value,
    //   body: content,
    //   date: date,
    //   time: time,
    //   id: id,
    //   Likes: 0,
    //   Shares: 0
    // })
    alert('Post created!');
    callback();

  }
}
export function fetchSubcategory(category, subcategories){
  return dispatch => {
    console.log('sub: ', subcategories[category]);
    dispatch({
      type: FETCH_SUBCATEGORY,
      payload: subcategories[category]
    })
  }
}


// show posts
export function fetchPost(postId){
  return dispatch => {
    const user = firebaseApp.auth().currentUser;
    const ref = firebaseApp.database().ref(`Users/${user.uid}/posts/${postId}`);
    ref.once('value').then((snapshot) => {
      const post = snapshot.val();
      dispatch({
        type:FETCH_POST,
        payload: post
      })
    })
  }

}
export function fetchPosts(callback){
  return dispatch => {
    const user = firebaseApp.auth().currentUser;
    const ref = firebaseApp.database().ref(`Users/${user.uid}/posts`);
    ref.once('value').then((snapshot)=>{
      const posts = snapshot.val();
      console.log('Posts: ', posts);
      dispatch({
        type: FETCH_POSTS,
        payload: posts
      });
      if(callback){
        console.log('callback callinggg');
        callback();
      }
    });
  }
}
export function deletePost(postId, callback){
  return dispatch => {
    const user = firebaseApp.auth().currentUser;
    firebaseApp.database().ref(`Users/${user.uid}/posts/${postId}`).remove().then(() => fetchPosts()).then(()=> callback());
  }
}

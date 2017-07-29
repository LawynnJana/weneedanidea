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
import _ from 'lodash';

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
    AccountHandle:accountHandle,
    DateOfBirth: "",
    FirstName: "",
    Gender: "",
    LastName: "",
    VerificationDate: ""
  })
}

function addAccHandleToDb(accountHandle, userRef){
  userRef.set(accountHandle)
}
//register stuff
export function submitUserHandle( { accountHandle } , callback){
  return dispatch => {
    const user = firebaseApp.auth().currentUser;
    firebaseApp.database().ref('AccountHandles/'+accountHandle.toLowerCase()).once("value")
    .then((snapshot) => {
      const exist = (snapshot.val()!==null)
      if(exist){
        alert("Account handle already exists!");
      } else{

        addAccHandleToDb(accountHandle, firebaseApp.database().ref('AccountHandles/'+accountHandle.toLowerCase()));
        addToUserDB(accountHandle ,firebaseApp.database().ref('Users/'+ user.uid));

        // Get default profile picture
        firebaseApp.storage().ref().child('images/default_profile_img.png').getDownloadURL().then((url) => {
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

//navbar stuff
export function logOut(cb){
  return dispatch => {
    firebaseApp.auth().signOut().then(()=>{
      //console.log("Signed out.");
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

//Profile stuff
export function submitProfileChanges({accountHandle, picture, firstName, lastName}, callback){
  return dispatch => {
    const user = firebaseApp.auth().currentUser;

    if(picture){
      const ref = firebaseApp.storage().ref(user.uid+'/profile/profile_pic');
      ref.put(picture).then(()=>{
        firebaseApp.storage().ref().child(user.uid+'/profile/profile_pic').getDownloadURL().then((photoURL) => {
          console.log("success")
          user.updateProfile({
            photoURL
          });
          dispatch(fetchUser(user.uid));
        })
      });
    }
    const userRef =firebaseApp.database().ref(`Users/${user.uid}`);
    if(firstName){
      userRef.update({FirstName: firstName})
    }
    if(lastName){
      userRef.update({LastName: lastName})
    }
    if(accountHandle){
      firebaseApp.database().ref('AccountHandles/'+accountHandle.toLowerCase()).once("value")
      .then((snapshot) => {
        const exist = (snapshot.val()!==null)
        if(exist && accountHandle.toLowerCase() !== user.displayName.toLowerCase()) {
          alert("Account handle already exists!");
        } else {
          if(accountHandle === user.displayName){
            alert("Same name! No change!");
          } else {
            firebaseApp.database().ref('AccountHandles/'+user.displayName.toLowerCase()).remove();
            addAccHandleToDb(accountHandle, firebaseApp.database().ref('AccountHandles/'+accountHandle.toLowerCase()));

            const updates = {}
            updates['/Users/'+user.uid+'/AccountHandle'] = accountHandle;
            firebaseApp.database().ref().update(updates);
            user.updateProfile({
              displayName: accountHandle,
            }).then(() => {
              console.log("Success updating profile")
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

// Creating new posts
export function createPost({title, category, content, subcategory, image}, callback){
  return dispatch => {
    const { uid } = firebaseApp.auth().currentUser;
    const userRef = firebaseApp.database().ref(`Users/${uid}/Posts/Active`).push();
    const postsRefKey = userRef.key;
    const Category = category.category.replace(/\s/g, '');
    const SubCategory = subcategory.subcategory.replace(/\s/g, '');
    const today = new Date(),
      CreationDate = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate(),
      time = today.getTime();

    // Path to Posts/ reference
    const path = `Posts/${Category}/${SubCategory}/Active/${postsRefKey}`;
    userRef.set({
      Location: {
        Category,
        SubCategory,
        PostId: postsRefKey,
      },
      Statistics: {
        Dislikes: 0,
        Likes: 0,
        Shares: 0,
      },
    });
    let imgSrc = null;

    if(image){
      const imgRef = firebaseApp.storage().ref(`${uid}/posts/pictures/${postsRefKey}`);
      imgRef.put(image).then(()=>{
        firebaseApp.storage().ref().child(`${uid}/posts/pictures/${postsRefKey}`).getDownloadURL().then((photoURL) => {
          imgSrc = photoURL
          const postsRef = firebaseApp.database().ref(path);
          postsRef.set({
            Body: content,
            CardInfo: {
              CreationDate,
              Dislikes: 0,
              Likes: 0,
              Shares: 0,
              Title: title,
              ImgSrc: imgSrc,
            },
            LastEditDate: CreationDate,
            Reports: 0,
            UserId: uid,
          });
        })
      })
    } else {
      const postsRef = firebaseApp.database().ref(path);
      postsRef.set({
        Body: content,
        CardInfo: {
          CreationDate,
          Dislikes: 0,
          Likes: 0,
          Shares: 0,
          Title: title,
          ImgSrc: '',
        },
        LastEditDate: CreationDate,
        Reports: 0,
        UserId: uid,
      });
    }

    const activeRef = firebaseApp.database().ref(`Users/${uid}/Posts/NumActivePosts`);
    let numPosts = 0;
    activeRef.once('value').then((snapshot)=>{
      const count = snapshot.val() + 1;
      activeRef.set(count);
    }).catch((err) => {
      alert.log("Error incrementing NumActivePosts...",err);
      activeRef.set(0);
    });

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
    const ref = firebaseApp.database().ref(`Users/${user.uid}/Posts/Active/${postId}`);
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
    const { uid } = firebaseApp.auth().currentUser;
    const ref = firebaseApp.database().ref(`Users/${uid}/Posts/Active`);
    ref.once('value').then((snapshot)=>{
      const pathsToPosts = _.map(snapshot.val(), (post, key) => {
        const { Location: { Category, SubCategory } } = post;
        return firebaseApp.database().ref(`Posts/${Category}/${SubCategory}/Active/${key}`).once('value').then((ss) => {
          return {...ss.val(), postId: key, creationTime: new Date(ss.val().CardInfo.CreationDate).getTime()};
        });
      });
      return Promise.all(pathsToPosts);
    }).then((posts)=>{
      const arrayToObject = (array, keyField) =>
       array.reduce((obj, item) => {
         obj[item[keyField]] = item
         return obj;
       }, {})
      const peopleObject = arrayToObject(posts, 'postId');
      dispatch({
        type: FETCH_POSTS,
        payload: peopleObject
      });

      if(callback){
        console.log('callback calling...');
        callback();
      }
    });
  }
}
//post show stuff
export function deletePost(postId, callback){
  return dispatch => {
    const user = firebaseApp.auth().currentUser;
    firebaseApp.database().ref(`Users/${user.uid}/posts/${postId}`).remove().then(() => fetchPosts()).then(()=> callback());
  }
}


// news Feed
export function fetchNewsFeed(){
  return dispatch => {
    const { uid } = firebaseApp.auth().currentUser;
    const ref = firebaseApp.database().ref(`Posts/Active`);
    ref.once('value').then((snapshot)=>{
      const pathsToPosts = _.map(snapshot.val(), (post, key) => {
        const { Location: { Category, SubCategory } } = post;
        return firebaseApp.database().ref(`Posts/${Category}/${SubCategory}/Active/${key}`).once('value').then((ss) => {
          return {...ss.val(), postId: key, creationTime: new Date(ss.val().CardInfo.CreationDate).getTime()};
        });
      });
      return Promise.all(pathsToPosts);
    }).then((posts)=>{
      const arrayToObject = (array, keyField) =>
       array.reduce((obj, item) => {
         obj[item[keyField]] = item
         return obj;
       }, {})
      const peopleObject = arrayToObject(posts, 'postId');
      dispatch({
        type: FETCH_POSTS,
        payload: peopleObject
      });

      if(callback){
        console.log('callback calling...');
        callback();
      }
    });
  }
}

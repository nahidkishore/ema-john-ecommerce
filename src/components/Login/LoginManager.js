import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework =()=>{
  if(firebase.apps.length ===0){
    firebase.initializeApp(firebaseConfig);
  }
}

export const handleGoogleSignIn =()=>{
  
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider)
  .then(res => {
     const {displayName,email, photoURL }=res.user;
     const signedInUser={
       isSignedIn: true,
       name: displayName,
       email: email,
       photo: photoURL,

     }
     return signedInUser;
    console.log(displayName,email,photoURL);
    //console.log(res);
  })
  .catch(err => {
    console.log(err);
    console.log(err.message);
  })
}

export const handleFbLogin=() => {
  const  fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    return user;
    // ...
  }).catch(function(error) {
    
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
}

export const handleSignOut=() => {
  //console.log('sign out clicked');
  return firebase.auth().signOut()
  .then(res => {
    const signOutUser={
      isSignedIn:false,
      name:'',
      email:'',
      photo:'',
      error:'',
      success:false,

    }
    return signOutUser; 
  })
  .catch(err =>{
    console.log(err)
  })
}
/* export const createWithUserAndPassword =()=>{
  firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
  .then(res => {
    const newUserInfo= {...user};
    newUserInfo.error='';
    newUserInfo.success=true;
    setUser(newUserInfo);
    //console.log(res);
    updateUserName(user.name);
  })
  .catch(error=> {
    // Handle Errors here.
    const newUserInfo= {...user};
    newUserInfo.error=error.message;
    newUserInfo.success=false;
    setUser(newUserInfo);
    // ...
  });
}

export const signInWithEmailAndPassword=()=>{
  firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then(res => {
    const newUserInfo= {...user};
    newUserInfo.error='';
    newUserInfo.success=true;
    setUser(newUserInfo);
    setLoggedInUser(newUserInfo);
    history.replace(from);
    console.log('sign in user info', res.user);

  })
  .catch(error=> {
    // Handle Errors here.
        // Handle Errors here.
        const newUserInfo= {...user};
        newUserInfo.error=error.message;
        newUserInfo.success=false;
        setUser(newUserInfo);
  });
}

const updateUserName =name => {
  const user = firebase.auth().currentUser;

user.updateProfile({
displayName: name
}).then(function() {
console.log('user name updated successfully');
}).catch(function(error) {
// An error happened.
console.log(error);
});
} */
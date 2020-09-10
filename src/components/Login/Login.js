import React, { useState, useContext } from 'react';

import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbLogin } from './LoginManager';

initializeLoginFramework();

function Login() {
  const [newUser,setNewUser]=useState(false);
  const [user,setUser]=useState({
    isSignedIn:false,
  
    name:'',
    email:'',
     photo:'',

  });

  const [loggedInUser,setLoggedInUser]=useContext(UserContext);
  const history=useHistory();
  const location=useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

const googleSignIn=()=> {
  handleGoogleSignIn()
  .then(response=>{
    setUser(response);
    setLoggedInUser(response);
    history.replace(from);
  })
}
const FbLogin=()=> {
  handleFbLogin()
  .then(response=>{
    setUser(response);
    setLoggedInUser(response);
    history.replace(from);
  })

}

const signOut=()=> {
  handleSignOut()
  .then(response=>{
    setUser(response);
    setLoggedInUser(response);
  })
}



  const handleBlur=(event) => {
    //console.log(event.target.name,event.target.value);
    //debugger;
    let isFieldValid=true;
  if(event.target.name ==='email'){
    isFieldValid=/\S+@\S+\.\S+/.test(event.target.value);
    

  }
  if(event.target.name === 'password'){
    const isPasswordValid =event.target.value.length>6;
    const passwordHasNumber=/\d{1}/.test(event.target.value);

    isFieldValid= isPasswordValid && passwordHasNumber;

  }
  if(isFieldValid){
    const newUserInfo={...user};
    newUserInfo[event.target.name]=event.target.value;
    setUser(newUserInfo);
  }

  }
  const handleSubmit=(event) => {
    //console.log(user.email,user.password);
    if(newUser && user.email && user.password){
    

    }
    if(!newUser && user.email && user.password){
     
    }
      event.preventDefault();
  }

  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ?<button onClick={signOut}>Sign out</button>:<button onClick={googleSignIn}>Sign in</button>
      }
      <br/>
      <button onClick={FbLogin}>Sign in using Facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
      <p>Your email: {user.email}</p>
      <img src={user.photo} alt=" "></img>
          </div>
      }
      <h1>Our Authentication</h1>
      <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign Up</label>
      
    <form onSubmit={handleSubmit}>

{newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your name" />} <br/>
     <input type="text" name="email"  onBlur={handleBlur} placeholder="Your email address" required/> <br/>

      <input type="password" name="password"  onBlur={handleBlur} id="" placeholder="Your Password" required/> <br/>

     <input type="submit" value={newUser?'Sign Up':'Sign In'}/>
    </form>
    <p style={{color: 'red'}}>{user.error}</p>
  {user.success && <p style={{color: 'green'}}>User {newUser? 'created': 'logged in'} successfully</p>}
    
    </div>
  );
}

export default Login;

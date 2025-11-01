import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const formSubmitHandler = async (event)=>{
    event.preventDefault();
    setIsLoading(true);
    console.log(isLoading);
    const userDetails = {
      email:emailRef.current.value,
      password:passwordRef.current.value,
      returnSecureToken:"true"
    }
    try{
   const response =  await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[AIzaSyAPItEdIRymlHllXc5EWozfIIUZ3q4TTOY]",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(userDetails),
      
    })
    if(!response.ok){
      throw new Error("User Exists");
    }
    const data =await response.json()
    console.log(data);
    setIsLoading(false);
    emailRef.current.value="";
    passwordRef.current.value="";
  }catch(err){
    alert(err);
  }

  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordRef}
          />
        </div>
        <div className={classes.actions}>
          {isLoading && <p style={{color:"pink",fontWeight:"bold"}}>Sending Request...</p>}
          {!isLoading &&
          <button
            type='submit'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

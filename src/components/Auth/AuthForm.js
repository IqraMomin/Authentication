import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import classes from './AuthForm.module.css';
import LoginContext from '../../store/login-context';


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const loginCtx = useContext(LoginContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const userDetails = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      returnSecureToken: true
    }
    if (isLogin) {
      try{
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPItEdIRymlHllXc5EWozfIIUZ3q4TTOY",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(userDetails)
        })
        setIsLoading(false);
        const data = await response.json();
        if(response.ok){
          loginCtx.login(data.idToken);
          history.replace("/");

        }else{
          let errorMessage = "Authentication Failed";
          if(data && data.error && data.error.message){
            errorMessage = data.error.message;
          }
          alert(errorMessage);
        }

      }catch(err){
        console.log(err);
      }

    } else {
      try {
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAPItEdIRymlHllXc5EWozfIIUZ3q4TTOY",
          {
            method: "POST",
            headers: {
              "Content-Type": "applicatiion/json"
            },
            body: JSON.stringify(userDetails),

          })
          setIsLoading(false);
          if(response.ok){

          }else{
            const data = await response.json();
            let errorMessage = "Authentication Failed";
            if(data && data.error && data.error.message){
              errorMessage = data.error.message;
              alert(errorMessage);
            }
          }
        
        emailRef.current.value = "";
        passwordRef.current.value = "";
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} />
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
          {isLoading && <p>Sending Request...</p>}
          {!isLoading && <button>{isLogin ? "Login" : "Create Account"}</button>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

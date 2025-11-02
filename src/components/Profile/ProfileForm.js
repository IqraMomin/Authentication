import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import LoginContext from '../../store/login-context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ProfileForm = () => {
  const passwordInputRef = useRef();
  const loginCtx = useContext(LoginContext);
  const history=useHistory();

  const formSubmitHandler = async (event)=>{
    event.preventDefault();
    const updatedData = {
      idToken:loginCtx.token,
      password:passwordInputRef.current.value,
      returnSecureToken:true
    }
    try{
      const response =await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAPItEdIRymlHllXc5EWozfIIUZ3q4TTOY",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(updatedData)
      })
      const data = await response.json();
      history.replace("/");
      

    }catch(err){
      console.log(err);
    }

  }
  return (
    <form onSubmit={formSubmitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;

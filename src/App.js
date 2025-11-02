import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import LoginContext from './store/login-context';
import { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function App() {
  const loginCtx= useContext(LoginContext);

useEffect(()=>{
  const checkToken = async()=>{
    if(!loginCtx.token) return;
  try{
    const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAPItEdIRymlHllXc5EWozfIIUZ3q4TTOY",{
      method:"POST",
      body:JSON.stringify({idToken:loginCtx.token}),
      headers:{
        "Content-type":"application/json"
      }
    })
    if(!response.ok){
      loginCtx.logout();
    }

  }catch{
    loginCtx.logout();
  }

  }
  checkToken();
  
},[loginCtx]);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Route path='/profile'>
          {loginCtx.isLoggedIn && <UserProfile />}
          {!loginCtx.isLoggedIn && <Redirect to="/auth"/>}
          
        </Route>
        <Route path="*"><Redirect to="/"/></Route>
      </Switch>
    </Layout>
  );
}

export default App;

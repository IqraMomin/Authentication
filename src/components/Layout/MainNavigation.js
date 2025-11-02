import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import LoginContext from '../../store/login-context';
import { useContext } from 'react';

const MainNavigation = () => {
  const loginCtx = useContext(LoginContext);
  const isLoggedIn= loginCtx.isLoggedIn;

  const logoutHandler = ()=>{
    loginCtx.logout();
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            {!isLoggedIn && <Link to='/auth'>Login</Link>}
          </li>
          <li>
            {isLoggedIn && <Link to='/profile'>Profile</Link>}
          </li>
          <li>
           {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

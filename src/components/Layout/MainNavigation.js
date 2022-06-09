import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContex from "../../stores/auth-context";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authContext = useContext(AuthContex);
  const isLoggedIn = authContext.isLoggedIn;
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

import React, { useState } from "react";

const AuthContex = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateExpirationTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const currentExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = currentExpirationTime - currentTime;
  return remainingDuration;
};

export const AuthContexProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [currentToken, setToken] = useState(initialToken);
  const userIsLoggedIn = !!currentToken;

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);

    setTimeout(logoutHandler,calculateExpirationTime(expirationTime))
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const contextValue = {
    token: currentToken,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContex.Provider value={contextValue}>
      {props.children}
    </AuthContex.Provider>
  );
};

export default AuthContex;

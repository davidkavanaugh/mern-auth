import React from "react";
import { Router } from "@reach/router";
import AuthRepository from "./repositories/auth.repository";
import NavRepository from "./repositories/nav.repository";
import UsersRepository from "./repositories/users.repository";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Navbar from "./Navbar";
import Login from "./Login";
import Registration from "./Registration";
import Dashboard from "./Dashboard";

const App = () => {
  const { linkState, linkStateChangeHandler } = NavRepository();

  const {
    loginState,
    loginStateChangeHandler,
    loginSubmitHandler,
    logoutHandler,
    registrationState,
    registrationStateChangeHandler,
    registrationSubmitHandler,
    refreshTokenHandler,
  } = AuthRepository();

  const { userState, getSelf, getAllUsers } = UsersRepository();

  return (
    <>
      <Navbar title="MERN Auth" links={linkState} logout={logoutHandler} />
      <Router>
        <PublicRoute
          path="/login"
          linkName="login"
          updateLink={linkStateChangeHandler}
          state={loginState}
          onChange={loginStateChangeHandler}
          onSubmit={loginSubmitHandler}
          submitBtn="Login"
          component={Login}
        />
        <PublicRoute
          path="/register"
          linkName="register"
          updateLink={linkStateChangeHandler}
          state={registrationState}
          onChange={registrationStateChangeHandler}
          onSubmit={registrationSubmitHandler}
          submitBtn="Register"
          component={Registration}
        />
        <PrivateRoute
          path="/"
          linkName="dashboard"
          updateLink={linkStateChangeHandler}
          refreshToken={refreshTokenHandler}
          getSelf={getSelf}
          userState={userState}
          component={Dashboard}
        />
      </Router>
    </>
  );
};

export default App;

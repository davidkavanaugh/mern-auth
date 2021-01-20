import React from "react";
import { Router } from "@reach/router";
import authRepository from "./repositories/auth.repository";
import Register from "./Register";

const App = () => {
  const { authState, authMethods } = authRepository();
  return (
    <>
      <Router>
        <Register state={authState} methods={authMethods} path="/register" />
      </Router>
    </>
  );
};

export default App;

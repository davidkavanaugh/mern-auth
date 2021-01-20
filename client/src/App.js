import React from "react";
import { Router } from "@reach/router";
import registrationRepository from "./repositories/registration.repository";
import loginRepository from "./repositories/login.repository";

import Form from "./Form";

const App = () => {
  const { registrationState, registrationMethods } = registrationRepository();
  const { loginState, loginMethods } = loginRepository();

  return (
    <>
      <Router>
        <Form
          path="/register"
          state={registrationState}
          methods={registrationMethods}
          submitBtn={"Submit"}
        />
        <Form
          path="/login"
          state={loginState}
          methods={loginMethods}
          submitBtn="Ok"
        />
      </Router>
    </>
  );
};

export default App;

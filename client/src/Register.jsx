import React from "react";
import { Form, Input } from "./Form";

const Register = (props) => {
  const { state, methods } = props;
  return (
    <Form onSubmit={methods.registerUser} submitBtn={"Submit"}>
      <Input
        name="firstName"
        type="text"
        placeholder="First Name"
        onChange={methods.handleChange}
        value={state.firstName}
        errors={state.firstNameErrors}
      />
      <Input
        name="lastName"
        type="text"
        placeholder="Last Name"
        onChange={methods.handleChange}
        value={state.lastName}
        errors={state.lastNameErrors}
      />
      <Input
        name="email"
        type="text"
        placeholder="Email Address"
        onChange={methods.handleChange}
        value={state.email}
        errors={state.emailErrors}
      />
      <Input
        name="password"
        type="text"
        placeholder="Password"
        onChange={methods.handleChange}
        value={state.password}
        errors={state.passwordErrors}
      />
      <Input
        name="confirmPassword"
        type="text"
        placeholder="Confirm Password"
        onChange={methods.handleChange}
        value={state.confirmPassword}
        errors={state.confirmPasswordErrors}
      />
    </Form>
  );
};

export default Register;

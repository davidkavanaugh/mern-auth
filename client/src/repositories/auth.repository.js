import { useReducer } from "react";
import { LoginError, RegistrationError } from "../errors/auth.errors";
import axios from "axios";
import { navigate } from "@reach/router";
import Cookies from "js-cookie";
const AuthRepository = () => {
  const reducer = (state, action) => {
    return {
      ...state,
      [action.type]: action.payload,
    };
  };

  const [loginState, setLoginState] = useReducer(reducer, {
    email: "",
    emailErrors: "",
    password: "",
  });

  const [registrationState, setRegistrationState] = useReducer(reducer, {
    firstName: "",
    firstNameErrors: "",
    lastName: "",
    lastNameErrors: "",
    email: "",
    emailErrors: "",
    password: "",
    passwordErrors: "",
    confirmPassword: "",
    confirmPasswordErrors: "",
  });

  const loginStateChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginState({
      type: name,
      payload: value,
    });
    setLoginState({
      type: `emailErrors`,
      payload: "",
    });
  };

  const API = process.env.REACT_APP_API;

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/auth/login`, {
        email: loginState.email,
        password: loginState.password,
      });
      if (!response.data.errors) {
        Cookies.set("token", response.data.token);
        navigate("/");
      } else throw new LoginError("oops", response.data.errors);
    } catch (err) {
      for (const error in err.errors) {
        setLoginState({
          type: `${error}Errors`,
          payload: err.errors[error].message,
        });
      }
    }
  };

  const logoutHandler = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  const registrationStateChangeHandler = (e) => {
    const { name, value } = e.target;
    setRegistrationState({
      type: name,
      payload: value,
    });
    if (name === "firstName") {
      if (value.length < 2) {
        setRegistrationState({
          type: "firstNameErrors",
          payload: "first name must be 2 characters or longer",
        });
      } else {
        setRegistrationState({
          type: "firstNameErrors",
          payload: "",
        });
      }
    }
    if (name === "lastName") {
      if (value.length < 2) {
        setRegistrationState({
          type: "lastNameErrors",
          payload: "last name must be 2 characters or longer",
        });
      } else {
        setRegistrationState({
          type: "lastNameErrors",
          payload: "",
        });
      }
    }
    if (name === "email") {
      if (!/^([\w-.]+@([\w-]+\.)+[\w-]+)?$/.test(value)) {
        setRegistrationState({
          type: "emailErrors",
          payload: "please enter a valid Email ddress",
        });
      } else {
        setRegistrationState({
          type: "emailErrors",
          payload: "",
        });
      }
    }
    if (name === "password") {
      if (value !== registrationState.confirmPassword) {
        setRegistrationState({
          type: "confirmPasswordErrors",
          payload: "passwords must match",
        });
      } else {
        setRegistrationState({
          type: "confirmPasswordErrors",
          payload: "",
        });
      }
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@~!#$%^&*?/+-])[A-Za-z\d@~!#$%^&*?/+-]{8,}$/.test(
          value
        )
      ) {
        setRegistrationState({
          type: "passwordErrors",
          payload:
            "passwords must be at least 8 characters, contain one uppercase letter, one lowercase letter, and one special character",
        });
      } else {
        setRegistrationState({
          type: "passwordErrors",
          payload: "",
        });
      }
    }
    if (name === "confirmPassword") {
      if (value !== registrationState.password) {
        setRegistrationState({
          type: "confirmPasswordErrors",
          payload: "passwords must match",
        });
      } else {
        setRegistrationState({
          type: "confirmPasswordErrors",
          payload: "",
        });
      }
    }
  };

  const registrationSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/auth/register`, {
        firstName: registrationState.firstName,
        lastName: registrationState.lastName,
        email: registrationState.email,
        password: registrationState.password,
        confirmPassword: registrationState.confirmPassword,
      });
      if (!response.data.errors) {
        Cookies.set("token", response.data.token);
        navigate("/");
      } else throw new RegistrationError("oops", response.data.errors);
    } catch (err) {
      for (const error in err.errors) {
        setRegistrationState({
          type: `${error}Errors`,
          payload: err.errors[error].message,
        });
      }
    }
  };

  const refreshTokenHandler = async () => {
    try {
      const response = await axios.get(`${API}/auth/refresh`, {
        headers: { authorization: `Bearer ${Cookies.get("token")}` },
      });
      Cookies.set("token", response.data.token);
    } catch (err) {
      navigate("/login");
    }
  };

  return {
    loginState,
    loginStateChangeHandler,
    loginSubmitHandler,
    logoutHandler,
    registrationState,
    registrationStateChangeHandler,
    registrationSubmitHandler,
    refreshTokenHandler,
  };
};

export default AuthRepository;

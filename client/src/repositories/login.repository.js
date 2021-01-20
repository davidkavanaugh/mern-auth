import { useReducer } from "react";
import { LoginError } from "../errors/auth.errors";
import axios from "axios";

const initialState = {
  email: "",
  emailErrors: "",
  password: "",
};

const reducer = (state, action) => {
  return {
    ...state,
    [action.type]: action.payload,
  };
};

const LoginRepository = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: name,
      payload: value,
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email: state.email,
          password: state.password,
        }
      );
      if (!response.data.errors) {
        console.log(response);
      } else throw new LoginError("oops", response.data.errors);
    } catch (err) {
      for (const error in err.errors) {
        dispatch({
          type: `${error}Errors`,
          payload: err.errors[error].message,
        });
      }
    }
  };

  return {
    loginState: state,
    loginMethods: {
      handleChange,
      loginUser,
    },
  };
};
export default LoginRepository;

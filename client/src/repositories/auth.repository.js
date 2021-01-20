import { useReducer } from "react";
import { RegistrationError } from "../errors/auth.errors";
// import { navigate } from "@reach/router";
import axios from "axios";

const initialState = {
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
};

const reducer = (state, action) => {
  return {
    ...state,
    [action.type]: action.payload,
  };
};

const AuthRepository = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: name,
      payload: value,
    });
    if (name === "firstName") {
      if (value.length < 2) {
        dispatch({
          type: "firstNameErrors",
          payload: "first name must be 2 characters or longer",
        });
      } else {
        dispatch({
          type: "firstNameErrors",
          payload: "",
        });
      }
    }
    if (name === "lastName") {
      if (value.length < 2) {
        dispatch({
          type: "lastNameErrors",
          payload: "last name must be 2 characters or longer",
        });
      } else {
        dispatch({
          type: "lastNameErrors",
          payload: "",
        });
      }
    }
    if (name === "email") {
      if (!/^([\w-.]+@([\w-]+\.)+[\w-]+)?$/.test(value)) {
        dispatch({
          type: "emailErrors",
          payload: "please enter a valid Email ddress",
        });
      } else {
        dispatch({
          type: "emailErrors",
          payload: "",
        });
      }
    }
    if (name === "password") {
      if (value !== state.confirmPassword) {
        dispatch({
          type: "confirmPasswordErrors",
          payload: "passwords must match",
        });
      } else {
        dispatch({
          type: "confirmPasswordErrors",
          payload: "",
        });
      }
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@~!#$%^&*?/+-])[A-Za-z\d@~!#$%^&*?/+-]{8,}$/.test(
          value
        )
      ) {
        dispatch({
          type: "passwordErrors",
          payload:
            "passwords must be at least 8 characters, contain one uppercase letter, one lowercase letter, and one special character",
        });
      } else {
        dispatch({
          type: "passwordErrors",
          payload: "",
        });
      }
    }
    if (name === "confirmPassword") {
      if (value !== state.password) {
        dispatch({
          type: "confirmPasswordErrors",
          payload: "passwords must match",
        });
      } else {
        dispatch({
          type: "confirmPasswordErrors",
          payload: "",
        });
      }
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          password: state.password,
          confirmPassword: state.confirmPassword,
        }
      );
      if (!response.data.errors) {
        console.log(response);
      } else throw new RegistrationError("oops", response.data.errors);
    } catch (err) {
      for (const error in err.errors) {
        dispatch({
          type: `${error}Errors`,
          payload: err.errors[error].message,
        });
      }
    }
  };

  const getAll = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      console.log("response: ", response);
    } catch (err) {
      console.log(err);
    }
  };

  //   const deletePlayer = (id) => {
  //     axios
  //       .delete(`http://localhost:8000/api/players/${id}`)
  //       .then((response) => {
  //         let playersArr = state.allPlayers.filter(
  //           (player) => player._id !== response.data._id
  //         );
  //         dispatch({
  //           type: "allPlayers",
  //           payload: playersArr,
  //         });
  //       })
  //       .catch((err) => console.log(err));
  //   };

  //   const getAllPlayers = () => {
  //     axios
  //       .get("http://localhost:8000/api/players")
  //       .then((response) => {
  //         dispatch({
  //           type: "allPlayers",
  //           payload: response.data,
  //         });
  //       })
  //       .catch((err) => console.log(err));
  //   };

  //   const patchPlayer = (id, update) => {
  //     axios
  //       .patch(`http://localhost:8000/api/players/${id}`, update)
  //       .then((response) => {
  //         let playersArr = [...state.allPlayers];
  //         playersArr.forEach((player) => {
  //           if (player._id === response.data._id) {
  //             for (const gameName in update) {
  //               player[gameName] = update[gameName];
  //             }
  //           }
  //         });
  //         dispatch({
  //           type: "allPlayers",
  //           payload: playersArr,
  //         });
  //       })
  //       .catch((err) => console.log(err));
  //   };

  return {
    authState: state,
    authMethods: {
      handleChange,
      registerUser,
      getAll,
      // deletePlayer,
      // getAllPlayers,
      // patchPlayer,
    },
  };
};

export default AuthRepository;

import { useReducer } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UsersRepository = () => {
  const reducer = (state, action) => {
    return {
      ...state,
      [action.type]: action.payload,
    };
  };

  const [userState, setUserState] = useReducer(reducer, {
    user: {},
    userList: [],
  });

  const API = process.env.REACT_APP_API;

  const getSelf = async () => {
    try {
      const response = await axios.get(`${API}/users/self`, {
        headers: { authorization: `Bearer ${Cookies.get("token")}` },
      });
      setUserState({
        type: "user",
        payload: response.data.user,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${API}/users`, {
        headers: { authorization: `Bearer ${Cookies.get("token")}` },
      });
      setUserState({
        type: "userList",
        payload: response.data.users,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    userState,
    getSelf,
    getAllUsers,
  };
};

export default UsersRepository;

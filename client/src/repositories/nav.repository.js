import { useReducer } from "react";

const NavRepository = () => {
  const reducer = (state, action) => {
    return {
      ...state,
      [action.type]: action.payload,
    };
  };

  const [linkState, setLinkState] = useReducer(reducer, {
    dashboard: {
      url: "/",
      active: false,
    },
    login: {
      url: "/login",
      active: false,
    },
    register: {
      url: "/register",
      active: false,
    },
    logout: {
      url: "",
      active: false,
    },
  });

  const linkStateChangeHandler = (link, isActive) => {
    let linkStateCopy = JSON.parse(JSON.stringify(linkState));
    linkStateCopy[link].active = isActive;
    setLinkState({
      type: link,
      payload: linkStateCopy[link],
    });
  };

  return {
    linkState,
    linkStateChangeHandler,
  };
};

export default NavRepository;

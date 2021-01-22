import React, { useEffect } from "react";
import { navigate } from "@reach/router";
import Cookies from "js-cookie";
const PrivateRoute = (props) => {
  const { linkName, updateLink, refreshToken } = props;
  useEffect(() => {
    if (Cookies.get("token")) {
      refreshToken();
    } else {
      navigate("/login");
    }
    if (linkName) {
      updateLink(linkName, true);
    }
    return () => {
      if (linkName) {
        updateLink(linkName, false);
      }
    };
  }, []);
  return <props.component {...props} />;
};

export default PrivateRoute;

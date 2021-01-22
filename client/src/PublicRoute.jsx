import React, { useEffect } from "react";
const PublicRoute = (props) => {
  const { linkName, updateLink } = props;
  useEffect(() => {
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

export default PublicRoute;

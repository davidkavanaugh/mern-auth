import React, { useEffect } from "react";
const Dashboard = (props) => {
  const { getSelf, userState } = props;
  useEffect(() => {
    getSelf();
  }, []);
  if (!userState) {
    return <>Loading...</>;
  } else {
    const { firstName, lastName } = userState.user;
    return (
      <div>
        Welcome, {firstName} {lastName}
      </div>
    );
  }
};

export default Dashboard;

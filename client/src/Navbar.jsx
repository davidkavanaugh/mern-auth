import React from "react";
import { navigate } from "@reach/router";
const Navbar = (props) => {
  const styles = {
    wrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    h1: {
      fontSize: "1.5em",
    },
    ul: {
      listStyle: "none",
      paddingLeft: "0px",
      display: "flex",
    },
    li: {
      padding: "0px 5px",
      cursor: "pointer",
    },
  };
  const { title, links, logout } = props;
  return (
    <div style={styles.wrapper}>
      <h1 style={styles.h1}>{title}</h1>
      <ul style={styles.ul}>
        {Object.keys(links).map((link, index) => {
          return (
            <li
              key={index}
              style={styles.li}
              onClick={
                link === "logout"
                  ? () => logout()
                  : () => navigate(`${links[link].url}`)
              }
              // onClick={
              //   link === "logout" ? logout() : () => navigate(links[link].url)
              // }
            >
              <span style={{ fontWeight: !links[link].active && "bold" }}>
                {link[0].toUpperCase().concat(link.slice(1))}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Navbar;

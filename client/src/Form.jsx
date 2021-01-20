import React from "react";

export const Form = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      {props.children}
      <input type="submit" value={props.submitBtn} />
    </form>
  );
};

export const Input = (props) => {
  const styles = {
    inputError: {
      border: "1px solid red",
    },
    p: {
      color: "red",
      height: "16px",
      margin: "0px 0px 5px 0px",
      fontSize: "14px",
      fontStyle: "italic",
    },
  };
  return (
    <div>
      <input
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        style={props.errors ? styles.inputError : null}
      />
      <p style={styles.p}>{props.errors && `*${props.errors}`}</p>
    </div>
  );
};

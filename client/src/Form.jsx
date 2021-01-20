import React from "react";

const Form = (props) => {
  const { state, methods, submitBtn } = props;
  return (
    <form onSubmit={methods.registerUser}>
      {Object.keys(state).map((item, index) => {
        if (!item.includes("Errors")) {
          return (
            <Input
              key={index}
              name={item}
              type={
                item.toLowerCase().includes("password") ? "password" : "text"
              }
              placeholder={item}
              onChange={methods.handleChange}
              value={state[item]}
              errors={state[`${item}Errors`]}
            />
          );
        }
        return <React.Fragment key={index}></React.Fragment>;
      })}
      <input type="submit" value={submitBtn} />
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

  const getLabel = (str) => {
    let response = str.split(/(?=[A-Z])/);
    response[0] = response[0][0].toUpperCase().concat(response[0].slice(1));
    return response.join(" ");
  };

  return (
    <div>
      <input
        name={props.name}
        type={props.type}
        placeholder={getLabel(props.placeholder)}
        onChange={props.onChange}
        value={props.value}
        style={props.errors ? styles.inputError : null}
      />
      <p style={styles.p}>{props.errors && `*${props.errors}`}</p>
    </div>
  );
};

export default Form;

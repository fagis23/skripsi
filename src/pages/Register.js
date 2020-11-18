import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../redux/actions/action_user";

import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import store from "../redux/store";
import { CLEAR_ERRORS } from "../redux/types";

import FormStart from "../components/FormStart/FormStart";

const Register = (props) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let error = {};
  const { loading } = props.ui;

  useEffect(() => {
    document.title = "Register";
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const dataRegister = {
      username,
      email,
      password,
      confirmPassword,
    };

    props.register(dataRegister, props.history);
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    if (Object.keys(error).length !== 0) {
      props.ui.error.fullName = "";
    }
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (Object.keys(error).length !== 0) {
      props.ui.error.email = "";
    }
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if (Object.keys(error).length !== 0) {
      props.ui.error.password = "";
    }
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (Object.keys(error).length !== 0) {
      props.ui.error.confirmPassword = "";
    }
  };

  if (props.ui.error !== "") {
    error = { ...props.ui.error };
  }

  return (
    <FormStart>
      <div className={classes.header}>
        <h1>Register</h1>
      </div>
      <form onSubmit={onSubmit}>
        <TextField
          id="outlined-basic-fullName"
          label="Full Name"
          variant="outlined"
          className={classes.fullName}
          onChange={(e) => onChangeUsername(e)}
          value={username}
          error={error.fullName ? true : false}
          helperText={error.fullName}
        />
        <TextField
          id="outlined-basic-email"
          label="Email"
          variant="outlined"
          type="text"
          className={classes.email}
          onChange={(e) => onChangeEmail(e)}
          value={email}
          error={error.email ? true : false}
          helperText={error.email}
        />
        <TextField
          id="outlined-basic-password"
          label="Password"
          variant="outlined"
          type="password"
          className={classes.password}
          onChange={(e) => onChangePassword(e)}
          value={password}
          error={error.password ? true : false}
          helperText={error.password}
        />
        <TextField
          id="outlined-basic-confirmPassword"
          label="Confirm Password"
          variant="outlined"
          type="password"
          className={classes.confirmPassword}
          onChange={(e) => onChangeConfirmPassword(e)}
          value={confirmPassword}
          error={error.confirmPassword ? true : false}
          helperText={error.confirmPassword}
        />
        {error.global && (
          <div style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
            <small>{error.global}</small>
          </div>
        )}
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <CircularProgress style={{ color: "#58b4ae" }} />
          </div>
        ) : (
          <input type="submit" className={classes.submit} value="Registrasi" />
        )}
      </form>
      <p>
        You have an account?{" "}
        <Link
          to="/login"
          className={classes.Link}
          onClick={() => store.dispatch({ type: CLEAR_ERRORS })}
        >
          Login Here
        </Link>
      </p>
    </FormStart>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
});
const mapActionToProps = {
  register,
};

const useStyles = makeStyles({
  header: {
    width: "100%",
    color: "var(--mainColor)",
  },
  fullName: {
    width: "100%",
    margin: "14px 0",
  },
  email: {
    width: "100%",
    marginBottom: "14px",
  },
  password: {
    width: "100%",
    marginBottom: "14px",
  },
  confirmPassword: {
    width: "100%",
    marginBottom: "14px",
  },
  submit: {
    margin: "1rem 0 5px 0",
    background: "var(--mainColor)",
    border: "1px solid var(--mainColor)",
    padding: "12px 10px",
    width: "100%",
    borderRadius: "4px",
    color: "white",
    cursor: "pointer",
    outline: "none",
    "&:hover": {
      background: "var(--darkColor)",
      border: "1px solid var(--darkColor)",
    },
  },
  Link: {
    color: "var(--mainColor)",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

export default connect(mapStateToProps, mapActionToProps)(Register);

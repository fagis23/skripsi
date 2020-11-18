import React, { useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { Link } from "react-router-dom";
import FormStart from "../components/FormStart/FormStart";

const Welcome = () => {
  const classes = useStyles();

  useEffect(() => {
    document.title = "IATI";
  }, []);

  return (
    <FormStart>
      <div className={classes.header}>
        <h1>welcome to</h1>
        <h4>iati online learning</h4>
      </div>
      <Link className={classes.login} to="/login">
        Login
      </Link>
      <h5 style={{ margin: "10px" }}>Atau</h5>
      <Link className={classes.register} to="/register">
        Register
      </Link>
    </FormStart>
  );
};

const useStyles = makeStyles({
  header: {
    textTransform: "uppercase",
    marginBottom: "2.5rem",
    width: "105%",
    color: "var(--mainColor)",
    letterSpacing: "1.5px",
    "& h4": {
      letterSpacing: "2.5px",
    },
  },
  login: {
    background: "var(--mainColor)",
    color: "white",
    border: "var(--mainColor)",
    padding: "6px 10px",
    cursor: "pointer",
    width: "100%",
    textDecoration: "none",
    borderRadius: "2px",
    textAlign: "center",
    "&:hover": {
      background: "var(--darkColor)",
    },
  },
  register: {
    background: "white",
    border: "1px solid var(--mainColor)",
    color: "var(--mainColor)",
    padding: "5px 10px",
    cursor: "pointer",
    width: "100%",
    borderRadius: "2px",
    textDecoration: "none",
    textAlign: "center",
    "&:hover": {
      background: "var(--darkColor)",
      color: "white",
      border: "1px solid var(--darkColor)",
    },
  },
});

export default Welcome;

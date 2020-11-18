import React, { useState } from "react";

import { connect } from "react-redux";
import { editPorfile } from "../../redux/actions/action_user";
import { clearError } from "../../redux/actions/action_ui";

import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";

const CreateNewThread = (props) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let error = {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      userId: props.user.credentials.id,
      username,
      password,
      confirmPassword,
    };
    props.editPorfile(data, props.onClose);
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
    if (Object.keys(error).length !== 0) {
      props.ui.error.fullname = "";
    }
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    if (Object.keys(error).length !== 0) {
      props.ui.error.password = "";
    }
  };
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (Object.keys(error).length !== 0) {
      props.ui.error.confirmPassword = "";
    }
  };

  if (props.ui.error !== "") {
    error = { ...props.ui.error };
  }

  const handleClose = () => {
    props.onClose();
    props.clearError();
  };

  return (
    <div className={classes.root}>
      <div className={classes.closeIcon} onClick={() => handleClose()}>
        <CloseIcon style={{ fontSize: 30 }} />
      </div>
      <div className={classes.header}>
        <Typography variant="h4">Edit Profile</Typography>
      </div>
      <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
        <TextField
          id="outlined-basic-username"
          label="Full Name"
          variant="outlined"
          className="username"
          value={username}
          onChange={(e) => handleChangeUsername(e)}
          error={error.fullname ? true : false}
          helperText={error.fullname}
        />
        <TextField
          id="outlined-basic-password"
          label="Password"
          variant="outlined"
          className="password"
          type="password"
          value={password}
          onChange={(e) => handleChangePassword(e)}
          error={error.password ? true : false}
          helperText={error.password}
        />
        <TextField
          id="outlined-basic-confirmpassword"
          label="Confirm Password"
          variant="outlined"
          className="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => handleChangeConfirmPassword(e)}
          error={error.confirmPassword ? true : false}
          helperText={error.confirmPassword}
        />
        {props.ui.loading ? (
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <CircularProgress style={{ color: "var(--mainColor)" }} />
          </div>
        ) : (
          <input type="submit" value="Edit Profile" className="button" />
        )}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
});

const useStyles = makeStyles({
  root: {
    position: "relative",
    padding: "1rem",
  },
  closeIcon: {
    position: "absolute",
    right: 0,
    marginRight: "1rem",
    top: 10,
    color: "var(--mainColor)",
    cursor: "pointer",
  },
  header: {
    color: "var(--mainColor)",
    marginBottom: "1.5rem",
    marginTop: "10px",
  },
  form: {
    "& .username": {
      width: "100%",
    },
    "& .password": {
      width: "100%",
      margin: "1.2rem 0",
    },
    "& .confirmPassword": {
      width: "100%",
      marginBottom: "1rem",
    },
    "& .button": {
      background: "var(--mainColor)",
      border: "1px solid var(--mainColor)",
      padding: "10px",
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
  },
});

export default connect(mapStateToProps, { editPorfile, clearError })(
  CreateNewThread
);

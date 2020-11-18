import React, { useState } from "react";

import { connect } from "react-redux";
import { addCourse } from "../../redux/actions/action_admin";
import { clearError } from "../../redux/actions/action_ui";

import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";

const AddCourse = (props) => {
  const classes = useStyles();
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseReference, setCourseReference] = useState("");
  const [courseLO, setCourseLO] = useState("");
  let error = {};

  const { loading } = props.ui;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      courseName,
      courseDescription,
      reference: courseReference,
      lo: courseLO,
    };
    props.addCourse(data, props.onClose);
  };

  const handleChangeCN = (e) => {
    setCourseName(e.target.value);
    if (Object.keys(error).length !== 0) {
      props.ui.error.courseName = "";
    }
  };
  const handleChangeCD = (e) => {
    setCourseDescription(e.target.value);
    if (Object.keys(error).length !== 0) {
      props.ui.error.courseDescription = "";
    }
  };
  const handleChangeCLO = (e) => {
    setCourseLO(e.target.value);
    if (Object.keys(error).length !== 0) {
      props.ui.error.courseLO = "";
    }
  };
  const handleChangeCR = (e) => {
    setCourseReference(e.target.value);
    if (Object.keys(error).length !== 0) {
      props.ui.error.courseReference = "";
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
        <Typography variant="h4">Add Course</Typography>
      </div>
      <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
        <TextField
          id="outlined-basic-name"
          label="Course Name"
          variant="outlined"
          className="topic"
          value={courseName}
          onChange={(e) => handleChangeCN(e)}
          error={error.courseName ? true : false}
          helperText={error.courseName}
          autoComplete="false"
        />
        <TextField
          id="outlined-basic-desc"
          label="Course Description"
          variant="outlined"
          className="question"
          value={courseDescription}
          onChange={(e) => handleChangeCD(e)}
          error={error.courseDescription ? true : false}
          helperText={error.courseDescription}
          multiline
          autoComplete="hidden"
        />
        <TextField
          id="outlined-basic-desc"
          label="Course Learning Outcomes"
          variant="outlined"
          className="lo"
          value={courseLO}
          onChange={(e) => handleChangeCLO(e)}
          error={error.courseLO ? true : false}
          helperText={error.courseLO}
          multiline
          autoComplete="hidden"
        />
        <TextField
          id="outlined-basic-desc"
          label="Course Reference"
          variant="outlined"
          className="reference"
          value={courseReference}
          onChange={(e) => handleChangeCR(e)}
          error={error.courseReference ? true : false}
          helperText={error.courseReference}
          multiline
          autoComplete="hidden"
        />

        {loading ? (
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <CircularProgress style={{ color: "var(--mainColor)" }} />
          </div>
        ) : (
          <input type="submit" value="Add Course" className="button" />
        )}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ui: state.ui,
  admin: state.admin,
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
    "& .topic": {
      width: "100%",
    },
    "& .question": {
      width: "100%",
      margin: "1.2rem 0",
    },
    "& .material": {
      width: "100%",
      marginBottom: "1rem",
    },
    "& .reference": {
      width: "100%",
      marginBottom: "1rem",
    },
    "& .lo": {
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

export default connect(mapStateToProps, { addCourse, clearError })(AddCourse);

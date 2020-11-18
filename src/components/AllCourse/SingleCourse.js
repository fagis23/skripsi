import React, { useEffect } from "react";

import { connect } from "react-redux";
import { takeCourse } from "../../redux/actions/action_data";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";

const SingleCourse = (props) => {
  const classes = useStyles();

  const {
    courseId,
    courseDescription,
    courseName,
    totalMaterial,
    totalStudyCase,
  } = props.single_course;

  const { loading_single_course } = props.data;

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (courseName === undefined) {
        document.title = "Course";
      } else {
        document.title = `Course: ${courseName}`;
      }
    }
    return () => (mounted = false);
  }, [courseName]);

  const handleTakeCourse = () => {
    const data = {
      courseId,
      userId: props.user.credentials.id,
    };
    if (window.confirm("Ingin mengambil course?")) {
      props.takeCourse(data, props.history);
    } else {
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.header}>
        {courseName}
      </Typography>
      <Paper className={classes.paper}>
        <div>
          <Typography
            variant="h5"
            style={{ fontWeight: "bold", color: "#1b1b2f" }}
          >
            Description
          </Typography>
          <Typography variant="h6">{courseDescription}</Typography>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <Typography variant="subtitle1" style={{ color: "#888888" }}>
            Total Material :{" "}
            <b style={{ color: "#1b1b2f" }}> {totalMaterial}</b>
          </Typography>
          <Typography variant="subtitle1" style={{ color: "#888888" }}>
            Total Study Case :{" "}
            <b style={{ color: "#1b1b2f" }}>{totalStudyCase}</b>
          </Typography>
          <Typography variant="subtitle1" style={{ color: "#888888" }}>
            Status : <b style={{ color: "#e84a5f" }}>Not Taken</b>
          </Typography>
        </div>
      </Paper>
      {loading_single_course ? (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <CircularProgress style={{ color: "var(--mainColor)" }} />
        </div>
      ) : (
        <button className={classes.button} onClick={() => handleTakeCourse()}>
          Take Course
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

const useStyles = makeStyles({
  header: { marginBottom: "10px", color: "var(--mainColor)" },
  paper: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
  },
  button: {
    marginTop: "10px",
    background: "var(--mainColor)",
    color: "white",
    border: "1px solid var(--mainColor)",
    padding: "10px",
    width: "20%",
    borderRadius: "4px",
    cursor: "pointer",
    outline: "none",
    "&:hover": {
      background: "#304866",
      border: "1px solid #304866",
    },
  },
});

export default connect(mapStateToProps, { takeCourse })(SingleCourse);

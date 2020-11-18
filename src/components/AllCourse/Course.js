import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";

const Course = (props) => {
  const classes = useStyles();
  const { role } = props.user.credentials;

  return (
    <>
      {props.mycourse ? (
        role === "Lecturer" ? (
          <Link style={{ textDecoration: "none" }} to={`/course`}>
            <Paper className={classes.newPaper}>
              <div className={classes.card}>
                <h4 className="nomor_mycourses">Course {props.index + 1}</h4>
                <h4 className="desc_mycourses">
                  {props.data.course.courseName}
                </h4>
              </div>
            </Paper>
          </Link>
        ) : (
          <Link
            style={{ textDecoration: "none" }}
            to={`/course/my_course/details?id=${props.data.course.id}`}
          >
            <Paper className={classes.newPaper}>
              <div className={classes.card}>
                <h4 className="nomor_mycourses">Course {props.index + 1}</h4>
                <h4 className="desc_mycourses">
                  {props.data.course.courseName}
                </h4>
              </div>
            </Paper>
          </Link>
        )
      ) : (
        <Link
          style={{ textDecoration: "none" }}
          to={`/course/available/details?id=${props.data.course.id}`}
        >
          <Paper className={classes.newPaper}>
            <div
              className={classes.card}
              style={{ background: "var(--mainColor)" }}
            >
              <div className={"nomor_courses"}>
                <h4>{props.index + 1}</h4>
              </div>
              <div className={"desc_courses"}>
                <h4>{props.data.course.courseName}</h4>
              </div>
            </div>
          </Paper>
        </Link>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const useStyles = makeStyles({
  newPaper: {
    marginBottom: "5px",
    cursor: "pointer",
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    "& .nomor_courses": {
      flex: 0.3,
      background: "var(--darkColor)",
      padding: "1.5rem 0",
      color: "white",
      height: "100%",
    },
    "& .nomor_mycourses": {
      flex: 0.3,
      background: "var(--mainColor)",
      padding: "1.5rem 0",
      color: "white",
      height: "100%",
    },
    "& .desc_mycourses": {
      flex: 1,
      color: "var(--mainColor)",
      padding: "1.5rem 0",
      height: "100%",
    },
    "& .desc_courses": {
      flex: 1,
      color: "white",
      background: "var(--mainColor)",
      padding: "1.5rem 0",
      height: "100%",
    },
  },
});

export default connect(mapStateToProps)(Course);

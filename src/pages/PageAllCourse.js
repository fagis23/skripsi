import React, { useEffect } from "react";
import Counting from "../components/Counting/Counting";
import Courses from "../components/AllCourse/Courses";

import { connect } from "react-redux";
import { getMyCourse, getAvalaibleCourse } from "../redux/actions/action_data";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Alert from "@material-ui/lab/Alert";

const PageCourses = (props) => {
  const classes = useStyles();
  let token;
  let userId;

  if (localStorage.length !== 0) {
    token = JSON.parse(localStorage.iatiToken);
    userId = token.userId;
  }

  useEffect(() => {
    props.getMyCourse(userId);
    document.title = "Course";
  }, []);

  useEffect(() => {
    props.getAvalaibleCourse(userId);
  }, []);

  const {
    available_course,
    my_course,
    loading_my_course,
    loading_available_course,
  } = props.data;

  return (
    <>
      <div className={classes.root}>
        <div className={classes.mycourse}>
          <div style={{ marginBottom: "20px" }}>
            {loading_my_course ? (
              <Counting header="My Course" loading />
            ) : (
              <Counting header="My Course" count={my_course.length} />
            )}
          </div>
          <div>
            {loading_my_course ? (
              <Courses datamycourse={my_course} loading mycourse />
            ) : (
              <Courses datamycourse={my_course} mycourse />
            )}
          </div>
        </div>
        <div className={classes.availalecourse}>
          <div style={{ marginBottom: "20px" }}>
            {loading_available_course ? (
              <Counting header="Available Course" loading />
            ) : (
              <Counting
                header="Available Course"
                count={available_course.length}
              />
            )}
          </div>
          {loading_available_course ? (
            <Courses datacourses={available_course} loading courses />
          ) : (
            <Courses datacourses={available_course} courses />
          )}
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

const mapActionToProps = {
  getMyCourse,
  getAvalaibleCourse,
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    color: "var(--mainBlack)",
    minHeight: "360px",
    padding: "0 7rem",
    marginBottom: "2rem",
    "& ::-webkit-scrollbar": {
      width: "10px",
    },
    "& ::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "5px",
    },
    "& ::-webkit-scrollbar-thumb": {
      background: "var(--mainColor)",
      borderRadius: "5px",
    },
    "& ::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  },
  mycourse: {
    flex: 1,
    padding: "0 1rem 0 0",
  },
  availalecourse: {
    flex: 1,
    padding: "0 0 0 1rem",
  },
});

export default connect(mapStateToProps, mapActionToProps)(PageCourses);
